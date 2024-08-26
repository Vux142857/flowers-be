import { IntersectionType } from "@nestjs/mapped-types";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

class GetCategoryBaseDto {
}

export class GetCategoryDto extends IntersectionType(
  GetCategoryBaseDto,
  PaginationQueryDto
) { }