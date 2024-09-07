import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagService } from './providers/tag.service';

@Module({
  controllers: [TagsController],
  providers: [TagService],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagService, TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
