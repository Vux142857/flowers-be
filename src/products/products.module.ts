import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './providers/product.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
  imports: [UsersModule],
})
export class ProductsModule { }
