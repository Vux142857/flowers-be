import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
declare class GetProductBaseDto {
}
declare const GetProductDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & GetProductBaseDto>;
export declare class GetProductDto extends GetProductDto_base {
}
export {};
