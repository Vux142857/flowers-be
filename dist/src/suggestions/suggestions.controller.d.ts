import { RequireParamDto } from '../common/require-param';
import { PatchSuggestionDto } from './dtos/patch-suggestions.dto';
import { GetByParamDto } from '../common/get-by-param';
import { CreateSuggestionDto } from './dtos/create-suggestions.dto';
import { GetSuggestionDto } from './dtos/get-suggestion.dto';
import { SuggestionService } from './providers/suggestions.service';
export declare class SuggestionsController {
    private readonly suggestionService;
    constructor(suggestionService: SuggestionService);
    getSuggestions(getProductParamDto: GetByParamDto, getProductDto: GetSuggestionDto): Promise<import("./suggestion.entity").Suggestion> | Promise<import("./suggestion.entity").Suggestion[]>;
    createSuggestion(createSuggestionDto: CreateSuggestionDto): Promise<CreateSuggestionDto & import("./suggestion.entity").Suggestion>;
    updateSuggestion(patchSuggestionParamDto: RequireParamDto, patchSuggestionDto: PatchSuggestionDto): Promise<import("typeorm").UpdateResult>;
    deleteSuggestion(deleteProductParamDto: RequireParamDto): Promise<import("typeorm").DeleteResult>;
}
