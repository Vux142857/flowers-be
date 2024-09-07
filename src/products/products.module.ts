import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './providers/product.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { SuggestionsModule } from 'src/suggestions/suggestions.module';
import { Category } from 'src/categories/category.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Product, Category]),
    CategoriesModule,
    SuggestionsModule,
    TagsModule,
  ],
  exports: [ProductService],
})
export class ProductsModule {}
