import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { StatusType } from 'src/common/statusType.enum';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;
}
