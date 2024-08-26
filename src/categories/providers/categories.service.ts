import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { PatchCategoryDto } from "../dtos/patch-category.dto";

@Injectable()
export class CategoriesService {
  getCategories(limit: number, page: number) {
    return 'Get all categories';
  }

  getCategory(id: string) {
    return `Get category with id ${id}`;
  }

  createCategory(payload: CreateCategoryDto) {
    return `Create category with payload ${payload}`;
  }

  updateCategory(id: string, payload: PatchCategoryDto) {
    return `Update category with id ${id} with payload ${payload}`;
  }

  deleteCategory(id: number) {
    return `Delete category with id ${id}`;
  }
}