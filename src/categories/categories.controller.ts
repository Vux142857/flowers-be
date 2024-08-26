import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { GetCategoryDto } from './dtos/get-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PatchCategoryDto } from './dtos/patch-category.dto';
import { GetByParamDto } from 'src/common/get-by-param';
import { RequireParamDto } from 'src/common/require-param';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoryService: CategoriesService) { }

  @Get(':/id')
  getCategories(
    @Param() getCategoryParamDto: GetByParamDto,
    @Query() getCategoryDto: GetCategoryDto,
  ) {
    const { id } = getCategoryParamDto;
    const { limit, page } = getCategoryDto;
    return id ? this.categoryService.getCategory(id) : this.categoryService.getCategories(limit, page);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch('/:id')
  updateCategory(@Param() patchCategory: RequireParamDto, @Body() patchCategoryDto: PatchCategoryDto) {
    const { id } = patchCategory;
    return this.categoryService.updateCategory(id, patchCategoryDto);
  }
}
