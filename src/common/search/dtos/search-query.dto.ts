import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

export class SearchQueryDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
