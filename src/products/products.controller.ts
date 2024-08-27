import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
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
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Patch('/:id')
  updateProduct(
    @Param() patchProductParamDto: RequireParamDto,
    @Body() patchProductDto: PatchProductDto,
  ) {
    const { id } = patchProductParamDto;
    return this.productService.updateProduct(id, patchProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param() deleteProductParamDto: RequireParamDto) {
    const { id } = deleteProductParamDto;
    return this.productService.deleteProduct(id);
  }
}
