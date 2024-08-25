import { Controller } from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoryService: CategoriesService) { }

  getCategories() {
    return this.categoryService.getCategories();
  }

  getCategory(id: number) {
    return this.categoryService.getCategory(id);
  }

  createCategory(payload: any) {
    return this.categoryService.createCategory(payload);
  }

  updateCategory(id: number, payload: any) {
    return this.categoryService.updateCategory(id, payload);
  }
}
