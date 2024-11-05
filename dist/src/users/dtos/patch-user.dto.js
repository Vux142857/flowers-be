"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class PatchUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.PatchUserDto = PatchUserDto;
//# sourceMappingURL=patch-user.dto.js.map