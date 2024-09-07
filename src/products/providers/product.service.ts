import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(limit: number, page: number) {
    const total = await this.productRepository.count();

    const maxPage = Math.ceil(total / limit) - 1;

    const validPage = Math.min(page, maxPage);

    const [products, count] = await this.productRepository.findAndCount({
      take: limit,
      skip: validPage * limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: products,
      total: count,
      page: validPage,
      pageCount: maxPage + 1,
    };
  }

  async getProductById(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async createProduct(
    payload: CreateProductDto,
    category: Category,
    tags?: Tag[],
  ) {
    return tags && tags.length > 0
      ? await this.productRepository.save({
          ...payload,
          slug: payload.name.toLowerCase().replace(/ /g, '-'),
          tags,
          category,
        })
      : await this.productRepository.save({
          ...payload,
          slug: payload.name.toLowerCase().replace(/ /g, '-'),
          category,
          tags: null,
        });
  }

  async updateProduct(
    id: string,
    payload: PatchProductDto,
    category?: Category,
    tags?: Tag[],
  ) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    Object.assign(product, payload);
    product.category = category ? category : product.category;
    product.tags = tags && tags.length > 0 ? tags : null;
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
