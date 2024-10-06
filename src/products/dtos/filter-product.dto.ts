import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

export class FilterProductDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  category?: string;
}
