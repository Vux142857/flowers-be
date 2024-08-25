import { IsString, IsNumber, IsArray, IsOptional, IsUUID, MinLength, MaxLength, IsEnum, IsNotEmpty } from 'class-validator';
import { StatusType } from 'src/common/statusType.enum';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: boolean;

  @IsUUID()
  categoryId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  remaining: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsUUID()
  @IsOptional()
  couponId?: string;

  @IsUUID()
  @IsOptional()
  suggesionId?: string;
}
