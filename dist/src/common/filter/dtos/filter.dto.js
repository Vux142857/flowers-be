"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../../common/pagination/dtos/pagination-query.dto");
class FilterQueryDto extends (0, mapped_types_1.PartialType)(pagination_query_dto_1.PaginationQueryDto) {
}
exports.FilterQueryDto = FilterQueryDto;
//# sourceMappingURL=filter.dto.js.map