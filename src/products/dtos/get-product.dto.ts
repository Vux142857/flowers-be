import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetProductBaseDto {}

export class GetProductDto extends IntersectionType(
  GetProductBaseDto,
  PaginationQueryDto,
) {}
