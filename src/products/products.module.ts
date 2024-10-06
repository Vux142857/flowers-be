import { Module } from '@nestjs/common';
import {
  AdminProductController,
  ProductsController,
} from './products.controller';
import { ProductService } from './providers/product.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { SuggestionsModule } from 'src/suggestions/suggestions.module';
import { Category } from 'src/categories/category.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { SearchModule } from 'src/common/search/search.module';
import { FilterModule } from 'src/common/filter/filter.module';

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
