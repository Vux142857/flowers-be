import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { UserService } from 'src/users/providers/users.service';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(limit: number, page: number) {
    return await this.productRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async getProductById(id: string) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async createProduct(payload: CreateProductDto) {
    return await this.productRepository.save(payload);
  }

  async updateProduct(id: string, payload: PatchProductDto) {
    return await this.productRepository.update(id, payload);
  }
}
