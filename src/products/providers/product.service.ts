import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Tag } from '../../tags/tag.entity';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';
import { SearchProvider } from '../../common/search/providers/search.provider';
import { StatusType } from '../../common/statusType.enum';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { FilterProvider } from '../../common/filter/providers/filter.provider';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly paginationProvider: PaginationProvider,

    private readonly searchProvider: SearchProvider,

    private readonly filterProvider: FilterProvider,
  ) {}

  async getProducts(limit: number, page: number): Promise<Paginated<Product>> {
    return await this.paginationProvider.paginateQuery<Product>(
      { limit, page },
      this.productRepository,
    );
  }

  async getProductsByStatus(limit: number, page: number, status: StatusType) {
    return await this.paginationProvider.paginateQuery<Product>(
      { limit, page, status },
      this.productRepository,
    );
  }

  async filterProducts(
    limit: number,
    page: number,
    category: string,
    status: StatusType = StatusType.ACTIVE,
  ) {
    return await this.filterProvider.filterAndPaginate<Product>(
      { limit, page, status },
      this.productRepository,
      { category, status },
    );
  }

  async searchProducts(
    paginationQuery: PaginationQueryDto,
    fields: string[],
    query: string,
  ) {
    return await this.searchProvider.searchAndPaginate<Product>(
      paginationQuery,
      this.productRepository,
      fields,
      query,
    );
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async countProducts(query: Record<string, string>) {
    return await this.productRepository.count({ where: query });
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

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.getProductById(productId);
    return product.remaining >= quantity;
  }

  async decreaseStock(productId: string, quantity: number): Promise<void> {
    const product = await this.getProductById(productId);
    if (product.remaining < quantity) {
      throw new Error(`Insufficient stock for product ${product.name}`);
    }
    product.remaining -= quantity;
    await this.productRepository.save(product);
  }
}
