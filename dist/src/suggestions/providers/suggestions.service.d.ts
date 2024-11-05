import { Suggestion } from '../suggestion.entity';
import { Repository } from 'typeorm';
import { PatchSuggestionDto } from '../dtos/patch-suggestions.dto';
import { CreateSuggestionDto } from '../dtos/create-suggestions.dto';
export declare class SuggestionService {
    private readonly suggestionRepository;
    constructor(suggestionRepository: Repository<Suggestion>);
    getSuggestions(limit: number, page: number): Promise<Suggestion[]>;
    getSuggestion(id: string): Promise<Suggestion>;
    createSuggestion(payload: CreateSuggestionDto): Promise<CreateSuggestionDto & Suggestion>;
    updateSuggestion(id: string, payload: PatchSuggestionDto): Promise<import("typeorm").UpdateResult>;
    deleteSuggestion(id: string): Promise<import("typeorm").DeleteResult>;
}
