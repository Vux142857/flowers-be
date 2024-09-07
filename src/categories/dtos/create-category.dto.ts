import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { StatusType } from 'src/common/statusType.enum';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}
