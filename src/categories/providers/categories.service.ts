import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { PatchCategoryDto } from '../dtos/patch-category.dto';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(limit: number, page: number) {
    return await this.categoryRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async getCategory(id: string) {
    return await this.categoryRepository.findOne({
      where: { id },
    });
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
