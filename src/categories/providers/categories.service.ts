import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { PatchCategoryDto } from '../dtos/patch-category.dto';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { SearchProvider } from 'src/common/search/providers/search.provider';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly paginationProvider: PaginationProvider,

    private readonly searchProvider: SearchProvider,
  ) {}

  async getCategories(limit: number, page: number) {
    return await this.paginationProvider.paginateQuery<Category>(
      { limit, page },
      this.categoryRepository,
    );
  }

  async getCategory(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async searchCategories(
    paginationQuery: PaginationQueryDto,
    fields: string[],
    query: string,
  ) {
    return await this.searchProvider.searchAndPaginate<Category>(
      paginationQuery,
      this.categoryRepository,
      fields,
      query,
    );
  }

  async createCategory(payload: CreateCategoryDto) {
    return await this.categoryRepository.save(payload);
  }

  async updateCategory(id: string, payload: PatchCategoryDto) {
    return await this.categoryRepository.update(id, payload);
  }

  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
