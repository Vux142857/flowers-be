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
exports.AdminProductController = exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./providers/product.service");
const create_product_dto_1 = require("./dtos/create-product.dto");
const patch_product_dto_1 = require("./dtos/patch-product.dto");
const get_by_param_1 = require("../common/get-by-param");
const get_product_dto_1 = require("./dtos/get-product.dto");
const require_param_1 = require("../common/require-param");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("../categories/providers/categories.service");
const tag_service_1 = require("../tags/providers/tag.service");
const roles_guard_1 = require("../auth/guards/authorization/roles.guard");
const role_decorator_1 = require("../auth/decorator/authorization/role.decorator");
const role_type_enum_1 = require("../auth/enums/role-type.enum");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../auth/enums/auth-type.enum");
const search_query_dto_1 = require("../common/search/dtos/search-query.dto");
const filter_product_dto_1 = require("./dtos/filter-product.dto");
const statusType_enum_1 = require("../common/statusType.enum");
let ProductsController = class ProductsController {
    constructor(productService) {
        this.productService = productService;
    }
    searchActiveProducts(searchQueryDto) {
        const { limit, page, query } = searchQueryDto;
        return this.productService.searchProducts({ limit, page, status: statusType_enum_1.StatusType.ACTIVE }, ['name'], query);
    }
    filterActiveProducts(filterQueryDto) {
        const { limit, page, category } = filterQueryDto;
        return this.productService.filterProducts(limit, page, category);
    }
    getProducts(getProductParamDto, getProductDto) {
        const { id } = getProductParamDto;
        const { limit, page } = getProductDto;
        return id
            ? this.productService.getProductById(id)
            : this.productService.getProducts(limit, page);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "searchActiveProducts", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "filterActiveProducts", null);
__decorate([
    (0, common_1.Get)('/:id?'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products or get only one product by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully found.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'numberf', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_product_dto_1.GetProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.NONE),
    (0, common_1.Controller)('products'),
    (0, swagger_1.ApiTags)('Products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductsController);
let AdminProductController = class AdminProductController {
    constructor(productService, categoryService, tagService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.tagService = tagService;
    }
    searchProducts(searchQueryDto) {
        const { limit, page, query } = searchQueryDto;
        return this.productService.searchProducts({ limit, page }, ['name'], query);
    }
    filterProducts(filterQueryDto) {
        const { limit, page, category, status } = filterQueryDto;
        return this.productService.filterProducts(limit, page, category, status);
    }
    countProducts(filterQueryDto) {
        const { status, category } = filterQueryDto;
        let query = {};
        if (status) {
            query = { ...query, status };
        }
        if (category) {
            query = { ...query, category };
        }
        return this.productService.countProducts(query);
    }
    async createProduct(createProductDto) {
        return this.createOrUpdateProduct(createProductDto, (category, tags) => this.productService.createProduct(createProductDto, category, tags));
    }
    async updateProduct(patchProductParamDto, patchProductDto) {
        const { id } = patchProductParamDto;
        return this.createOrUpdateProduct(patchProductDto, (category, tags) => this.productService.updateProduct(id, patchProductDto, category, tags));
    }
    deleteProduct(deleteProductParamDto) {
        const { id } = deleteProductParamDto;
        return this.productService.deleteProduct(id);
    }
    async createOrUpdateProduct(payload, saveCallback) {
        const { categoryId, tags } = payload;
        const tagArray = Array.isArray(tags) ? tags : [];
        const [category, existedTags] = await Promise.all([
            this.categoryService.getCategory(categoryId),
            this.tagService.getTags(tagArray),
        ]);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (tags && tags.length > 0 && tags.length !== existedTags.length) {
            throw new common_1.NotFoundException('Some tags not found');
        }
        return saveCallback(category, existedTags);
    }
};
exports.AdminProductController = AdminProductController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], AdminProductController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDto]),
    __metadata("design:returntype", void 0)
], AdminProductController.prototype, "filterProducts", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDto]),
    __metadata("design:returntype", void 0)
], AdminProductController.prototype, "countProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], AdminProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto,
        patch_product_dto_1.PatchProductDto]),
    __metadata("design:returntype", Promise)
], AdminProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto]),
    __metadata("design:returntype", void 0)
], AdminProductController.prototype, "deleteProduct", null);
exports.AdminProductController = AdminProductController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        categories_service_1.CategoryService,
        tag_service_1.TagService])
], AdminProductController);
//# sourceMappingURL=products.controller.js.map