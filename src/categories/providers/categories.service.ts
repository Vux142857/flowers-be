import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dtos/create-category.dto";

@Injectable()
export class CategoriesService {
  getCategories() {
    return 'Get all categories';
  }

  getCategory(id: number) {
    return `Get category with id ${id}`;
  }

  createCategory(payload: CreateCategoryDto) {
    return `Create category with payload ${payload}`;
  }

  updateCategory(id: number, payload: CreateCategoryDto) {
    return `Update category with id ${id} with payload ${payload}`;
  }

  deleteCategory(id: number) {
    return `Delete category with id ${id}`;
  }
}