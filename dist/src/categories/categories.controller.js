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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const get_category_dto_1 = require("./dtos/get-category.dto");
const create_category_dto_1 = require("./dtos/create-category.dto");
const patch_category_dto_1 = require("./dtos/patch-category.dto");
const get_by_param_1 = require("../common/get-by-param");
const require_param_1 = require("../common/require-param");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./providers/categories.service");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../auth/enums/auth-type.enum");
const role_type_enum_1 = require("../auth/enums/role-type.enum");
const roles_guard_1 = require("../auth/guards/authorization/roles.guard");
const role_decorator_1 = require("../auth/decorator/authorization/role.decorator");
const search_query_dto_1 = require("../common/search/dtos/search-query.dto");
let CategoriesController = class CategoriesController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    searchCategories(searchQueryDto) {
        const { limit, page, query } = searchQueryDto;
        return this.categoryService.searchCategories({ limit, page }, ['name'], query);
    }
    filterCategories(filterCategoryDto) {
        const { limit, page, status } = filterCategoryDto;
        return this.categoryService.filterCategories(limit, page, { status });
    }
    countCategories(filterQueryDto) {
        const { status } = filterQueryDto;
        let query = {};
        if (status) {
            query = { ...query, status };
        }
        return this.categoryService.countCategories(query);
    }
    getCategories(getCategoryParamDto, getCategoryDto) {
        const { id } = getCategoryParamDto;
        const { limit, page } = getCategoryDto;
        return id
            ? this.categoryService.getCategory(id)
            : this.categoryService.getCategories(limit, page);
    }
    createCategory(createCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }
    updateCategory(patchCategory, patchCategoryDto) {
        const { id } = patchCategory;
        return this.categoryService.updateCategory(id, patchCategoryDto);
    }
    deleteCategory(deleteCategory) {
        const { id } = deleteCategory;
        return this.categoryService.deleteCategory(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "searchCategories", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_category_dto_1.GetCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "filterCategories", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_category_dto_1.GetCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "countCategories", null);
__decorate([
    (0, common_1.Get)('/:id?'),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.NONE),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all categories or get only one category by id',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The category has been successfully found.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_category_dto_1.GetCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto,
        patch_category_dto_1.PatchCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "deleteCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, swagger_1.ApiTags)('Categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoryService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map