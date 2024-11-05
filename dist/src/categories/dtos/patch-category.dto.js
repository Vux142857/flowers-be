"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_dto_1 = require("./create-category.dto");
class PatchCategoryDto extends (0, mapped_types_1.PartialType)(create_category_dto_1.CreateCategoryDto) {
}
exports.PatchCategoryDto = PatchCategoryDto;
//# sourceMappingURL=patch-category.dto.js.map