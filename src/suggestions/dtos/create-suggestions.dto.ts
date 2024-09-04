import { IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateSuggestionDto {
  @IsArray()
  @ArrayMinSize(1, {
    message: 'listCombination must contain at least one item.',
  })
  @IsString({
    each: true,
    message: 'Each item in listCombination must be a string.',
  })
  listCombination: string[];
}
