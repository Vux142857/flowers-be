import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
declare class GetUserBaseDto {
}
declare const GetUserDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & GetUserBaseDto>;
export declare class GetUserDto extends GetUserDto_base {
}
export {};
