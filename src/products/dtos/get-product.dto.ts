import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

class GetProductBaseDto { }

export class GetProductDto extends IntersectionType(
  GetProductBaseDto,
  PaginationQueryDto
) { }