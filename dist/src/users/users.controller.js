"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user.dto");
const patch_user_dto_1 = require("./dtos/patch-user.dto");
const users_service_1 = require("./providers/users.service");
const get_by_param_1 = require("../common/get-by-param");
const get_user_dto_1 = require("./dtos/get-user.dto");
const require_param_1 = require("../common/require-param");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/guards/authorization/roles.guard");
const role_decorator_1 = require("../auth/decorator/authorization/role.decorator");
const role_type_enum_1 = require("../auth/enums/role-type.enum");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../auth/enums/auth-type.enum");
const search_query_dto_1 = require("../common/search/dtos/search-query.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getCustomer(getUserDto) {
        const { limit, page, status } = getUserDto;
        return this.userService.getAllCustomers(limit, page, status);
    }
    searchUser(searchQueryDto) {
        const { limit, page, query } = searchQueryDto;
        return this.userService.searchUsers({ limit, page }, ['name', 'email'], query);
    }
    filterUser(filterUserDto) {
        const { limit, page, status } = filterUserDto;
        return this.userService.filterUsers(limit, page, { status });
    }
    countUser(getUserDto) {
        const { status } = getUserDto;
        return this.userService.countUsers({ status });
    }
    getUsers(getUserParamDto, getUserDto) {
        const { id } = getUserParamDto;
        const { limit, page } = getUserDto;
        return id
            ? this.userService.findUserById(id)
            : this.userService.findAll(limit, page);
    }
    createUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    patchUser(patchUserParamDto, patchUserDto) {
        const { id } = patchUserParamDto;
        const existingUser = this.userService.findUserById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.userService.updateUser(id, patchUserDto);
    }
    deleteUser(deleteUserParamDto) {
        this.userService.deleteUser(deleteUserParamDto.id);
        return {
            message: 'User deleted successfully',
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('customer'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCustomer", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "searchUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "filterUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "countUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users or get only one user by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully found.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false }),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/:id?'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto,
        patch_user_dto_1.PatchUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "patchUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [users_service_1.UserService])
], UsersController);
//# sourceMappingURL=users.controller.js.map