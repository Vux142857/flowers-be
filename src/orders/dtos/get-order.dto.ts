import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetOrderBaseDto {}

export class GetOrderDto extends IntersectionType(
  GetOrderBaseDto,
  PaginationQueryDto,
) {}
