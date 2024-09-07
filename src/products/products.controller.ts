import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './providers/product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';
import { GetByParamDto } from 'src/common/get-by-param';
import { GetProductDto } from './dtos/get-product.dto';
import { RequireParamDto } from 'src/common/require-param';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/categories/providers/categories.service';
import { TagService } from 'src/tags/providers/tag.service';
import { Category } from 'src/categories/category.entity';
import { Product } from './product.entity';
import { Tag } from 'src/tags/tag.entity';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  @Get('/:id?')
  @ApiOperation({ summary: 'Get all products or get only one product by id' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
  })
  @ApiQuery({ name: 'page', type: 'numberf', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  getProducts(
    @Param() getProductParamDto: GetByParamDto,
    @Query() getProductDto: GetProductDto,
  ) {
    const { id } = getProductParamDto;
    const { limit, page } = getProductDto;
    return id
      ? this.productService.getProductById(id)
      : this.productService.getProducts(limit, page);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createOrUpdateProduct(createProductDto, (category, tags) =>
      this.productService.createProduct(createProductDto, category, tags),
    );
  }

  @Patch('/:id')
  async updateProduct(
    @Param() patchProductParamDto: RequireParamDto,
    @Body() patchProductDto: PatchProductDto,
  ) {
    const { id } = patchProductParamDto;
    return this.createOrUpdateProduct(patchProductDto, (category, tags) =>
      this.productService.updateProduct(id, patchProductDto, category, tags),
    );
  }

  @Delete('/:id')
  deleteProduct(@Param() deleteProductParamDto: RequireParamDto) {
    const { id } = deleteProductParamDto;
    return this.productService.deleteProduct(id);
  }

  // utils/post-patch-product.ts
  private async createOrUpdateProduct(
    payload: CreateProductDto | PatchProductDto,
    saveCallback: (category: Category, tags: Tag[]) => Promise<Product>,
  ) {
    const { categoryId, tags } = payload;
    const tagArray = Array.isArray(tags) ? tags : [];

    const [category, existedTags] = await Promise.all([
      this.categoryService.getCategory(categoryId),
      this.tagService.getTags(tagArray),
    ]);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (tags && tags.length > 0 && tags.length !== existedTags.length) {
      throw new NotFoundException('Some tags not found');
    }

    return saveCallback(category, existedTags);
  }
}
