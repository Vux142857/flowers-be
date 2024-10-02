import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchProvider } from './providers/search.provider';

@Module({
  controllers: [SearchController],
  providers: [SearchProvider],
})
export class SearchModule {}
