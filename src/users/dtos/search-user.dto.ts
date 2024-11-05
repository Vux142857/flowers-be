import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetUserBaseDto {}

export class GetUserDto extends IntersectionType(
  PaginationQueryDto,
  GetUserBaseDto,
) {}
