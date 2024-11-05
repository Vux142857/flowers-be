import { Module } from '@nestjs/common';
import {
  AdminProductController,
  ProductsController,
} from './products.controller';
import { ProductService } from './providers/product.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { SuggestionsModule } from '../suggestions/suggestions.module';
import { Category } from '../categories/category.entity';
import { TagsModule } from '../tags/tags.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import { SearchModule } from '../common/search/search.module';
import { FilterModule } from '../common/filter/filter.module';

@Module({
  controllers: [ProductsController, AdminProductController],
  providers: [ProductService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Product, Category]),
    CategoriesModule,
    SuggestionsModule,
    TagsModule,
    PaginationModule,
    SearchModule,
    FilterModule,
  ],
  exports: [ProductService],
})
export class ProductsModule {}
