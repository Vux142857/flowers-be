"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../common/pagination/dtos/pagination-query.dto");
class GetOrderBaseDto {
}
class GetOrderDto extends (0, mapped_types_1.IntersectionType)(GetOrderBaseDto, pagination_query_dto_1.PaginationQueryDto) {
}
exports.GetOrderDto = GetOrderDto;
//# sourceMappingURL=get-order.dto.js.map