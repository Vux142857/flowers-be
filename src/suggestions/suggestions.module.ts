import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './providers/suggestions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './suggestion.entity';

@Module({
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
  imports: [TypeOrmModule.forFeature([Suggestion])],
})
export class SuggestionsModule {}
