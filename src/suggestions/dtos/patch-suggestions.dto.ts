import { PartialType } from '@nestjs/mapped-types';
import { CreateSuggestionDto } from './create-suggestions.dto';

export class PatchSuggestionDto extends PartialType(CreateSuggestionDto) {}
