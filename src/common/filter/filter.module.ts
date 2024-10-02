import { Module } from '@nestjs/common';
import { FilterController } from './filter.controller';
import { FilterProvider } from './providers/filter.provider';

@Module({
  controllers: [FilterController],
  providers: [FilterProvider],
})
export class FilterModule {}
