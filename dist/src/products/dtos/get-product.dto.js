"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../common/pagination/dtos/pagination-query.dto");
class GetProductBaseDto {
}
class GetProductDto extends (0, mapped_types_1.IntersectionType)(GetProductBaseDto, pagination_query_dto_1.PaginationQueryDto) {
}
exports.GetProductDto = GetProductDto;
//# sourceMappingURL=get-product.dto.js.map