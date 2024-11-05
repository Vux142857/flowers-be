"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchSuggestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_suggestions_dto_1 = require("./create-suggestions.dto");
class PatchSuggestionDto extends (0, mapped_types_1.PartialType)(create_suggestions_dto_1.CreateSuggestionDto) {
}
exports.PatchSuggestionDto = PatchSuggestionDto;
//# sourceMappingURL=patch-suggestions.dto.js.map