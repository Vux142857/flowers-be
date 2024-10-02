import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { PatchCategoryDto } from '../dtos/patch-category.dto';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    private readonly paginationProvider: PaginationProvider,
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
