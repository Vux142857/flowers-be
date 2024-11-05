import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
declare class GetCategoryBaseDto {
}
declare const GetCategoryDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & GetCategoryBaseDto>;
export declare class GetCategoryDto extends GetCategoryDto_base {
}
export {};
