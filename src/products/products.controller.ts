import { Controller } from '@nestjs/common';
import { ProductService } from './providers/product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) { }

  getProducts() {
    return this.productService.getProducts();
  }

  getProductById(id: number) {
    return this.productService.getProductById(id);
  }

  createProduct(payload: CreateProductDto) {
    return this.productService.createProduct(payload);
  }

  updateProduct(id: number, payload: PatchProductDto) {
    return this.productService.updateProduct(id, payload);
  }
}
