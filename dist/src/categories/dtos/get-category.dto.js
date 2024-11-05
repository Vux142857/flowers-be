"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../common/pagination/dtos/pagination-query.dto");
class GetCategoryBaseDto {
}
class GetCategoryDto extends (0, mapped_types_1.IntersectionType)(GetCategoryBaseDto, pagination_query_dto_1.PaginationQueryDto) {
}
exports.GetCategoryDto = GetCategoryDto;
//# sourceMappingURL=get-category.dto.js.map