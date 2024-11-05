"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../common/pagination/dtos/pagination-query.dto");
class GetUserBaseDto {
}
class GetUserDto extends (0, mapped_types_1.IntersectionType)(pagination_query_dto_1.PaginationQueryDto, GetUserBaseDto) {
}
exports.GetUserDto = GetUserDto;
//# sourceMappingURL=get-user.dto.js.map