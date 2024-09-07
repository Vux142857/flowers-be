import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './suggestion.entity';
import { SuggestionService } from './providers/suggestions.service';

@Module({
  controllers: [SuggestionsController],
  providers: [SuggestionService],
  imports: [TypeOrmModule.forFeature([Suggestion])],
  exports: [SuggestionService],
})
export class SuggestionsModule {}
