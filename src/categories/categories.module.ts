import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './providers/categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoryService],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
})
export class CategoriesModule {}
