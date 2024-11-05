import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';

class GetSuggestionBaseDto {}

export class GetSuggestionDto extends IntersectionType(
  GetSuggestionBaseDto,
  PaginationQueryDto,
) {}
