import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
declare class GetOrderBaseDto {
}
declare const GetOrderDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & GetOrderBaseDto>;
export declare class GetOrderDto extends GetOrderDto_base {
}
export {};
