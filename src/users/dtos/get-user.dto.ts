import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetUserBaseDto {}

export class GetUserDto extends IntersectionType(
  PaginationQueryDto,
  GetUserBaseDto,
) {}
