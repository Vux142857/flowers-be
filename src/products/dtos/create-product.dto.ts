import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsUUID,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  Matches,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { StatusType } from 'src/common/statusType.enum';
import { CreateSuggestionDto } from 'src/suggestions/dtos/create-suggestions.dto';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;

  @IsUUID()
  categoryId: string;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  remaining: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  tags: string[];

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" as a separator, and without space',
  })
  slug: string;

  @IsUUID()
  @IsOptional()
  couponCode?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSuggestionDto)
  suggestion: CreateSuggestionDto | null;
}
