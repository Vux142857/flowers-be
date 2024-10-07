import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './providers/categories.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { SearchModule } from 'src/common/search/search.module';
import { FilterModule } from 'src/common/filter/filter.module';

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
