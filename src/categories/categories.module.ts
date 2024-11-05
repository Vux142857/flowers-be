import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './providers/categories.service';
import { PaginationModule } from '../common/pagination/pagination.module';
import { SearchModule } from '../common/search/search.module';
import { FilterModule } from '../common/filter/filter.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([Category]),
    PaginationModule,
    SearchModule,
    FilterModule,
  ],
  exports: [CategoryService],
})
export class CategoriesModule {}
