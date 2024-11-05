"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSuggestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pagination_query_dto_1 = require("../../common/pagination/dtos/pagination-query.dto");
class GetSuggestionBaseDto {
}
class GetSuggestionDto extends (0, mapped_types_1.IntersectionType)(GetSuggestionBaseDto, pagination_query_dto_1.PaginationQueryDto) {
}
exports.GetSuggestionDto = GetSuggestionDto;
//# sourceMappingURL=get-suggestion.dto.js.map