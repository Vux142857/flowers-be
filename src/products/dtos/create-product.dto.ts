import { IsString, IsNumber, IsArray, IsOptional, IsUUID, MinLength, MaxLength, IsEnum, IsNotEmpty, Matches } from 'class-validator';
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
  @MinLength(3, { each: true })
  @MaxLength(50, { each: true })
  tags: string[];

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'A slug should be all small letters and uses only "-" as a separator, and without space'
  })
  slug: string;

  @IsUUID()
  @IsOptional()
  couponId?: string;

  @IsUUID()
  @IsOptional()
  suggesionId?: string;
}
