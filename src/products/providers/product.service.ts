import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { Tag } from 'src/tags/tag.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getProducts(
    limit: number,
    page: number,
  ): Promise<Paginated<Product>> {
    return await this.paginationProvider.paginateQuery<Product>(
      { limit, page },
      this.productRepository,
    );
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
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
