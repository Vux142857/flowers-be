import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { StatusType } from '../../common/statusType.enum';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}
