import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetProductBaseDto {}

export class GetProductDto extends IntersectionType(
  GetProductBaseDto,
  PaginationQueryDto,
) {}
