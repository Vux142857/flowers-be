import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "../dtos/create-product.dto";
import { PatchProductDto } from "../dtos/patch-product.dto";
import { UserService } from "src/users/providers/users.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UserService
  ) { }

  getProducts() {
    return [
      {
        id: 1,
        name: 'Product 1',
        price: 100
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200
      }
    ];
  }

  getProductById(id: number) {
    return {
      id,
      name: 'Product 1',
      price: 100
    };
  }

  createProduct(payload: CreateProductDto) {
    return {
      ...payload
    };
  }

  updateProduct(id: number, payload: PatchProductDto) {
    return {
      id,
      ...payload
    };
  }
}