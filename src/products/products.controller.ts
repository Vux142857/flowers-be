import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductService } from './providers/product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';
import { GetByParamDto } from 'src/common/get-by-param';
import { GetProductDto } from './dtos/get-product.dto';
import { RequireParamDto } from 'src/common/require-param';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) { }

  @Get('/:id')
  getProducts(
    @Param() getProductParamDto: GetByParamDto,
    @Query() getProductDto: GetProductDto
  ) {
    const { id } = getProductParamDto;
    const { limit, page } = getProductDto;
    return id ? this.productService.getProductById(id) : this.productService.getProducts(limit, page);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/:id')
  updateProduct(
    @Param() patchProductParamDto: RequireParamDto,
    @Body() patchProductDto: PatchProductDto) {
    const { id } = patchProductParamDto;
    return this.productService.updateProduct(id, patchProductDto);
  }
}
