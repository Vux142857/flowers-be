import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
declare class GetSuggestionBaseDto {
}
declare const GetSuggestionDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & GetSuggestionBaseDto>;
export declare class GetSuggestionDto extends GetSuggestionDto_base {
}
export {};
