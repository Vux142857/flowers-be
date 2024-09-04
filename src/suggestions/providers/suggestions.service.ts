import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from '../suggestion.entity';
import { Repository } from 'typeorm';
import { PatchSuggestionDto } from '../dtos/patch-suggestions.dto';
import { CreateSuggestionDto } from '../dtos/create-suggestions.dto';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: Repository<Suggestion>,
  ) {}

  async getSuggestions(limit: number, page: number) {
    return await this.suggestionRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async getSuggestion(id: string) {
    return await this.suggestionRepository.findOne({
      where: { id },
    });
  }

  async createSuggestion(payload: CreateSuggestionDto) {
    return await this.suggestionRepository.save(payload);
  }

  async updateSuggestion(id: string, payload: PatchSuggestionDto) {
    return await this.suggestionRepository.update(id, payload);
  }

  async deleteSuggestion(id: string) {
    return await this.suggestionRepository.delete(id);
  }
}
