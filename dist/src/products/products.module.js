"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const product_service_1 = require("./providers/product.service");
const users_module_1 = require("../users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const categories_module_1 = require("../categories/categories.module");
const suggestions_module_1 = require("../suggestions/suggestions.module");
const category_entity_1 = require("../categories/category.entity");
const tags_module_1 = require("../tags/tags.module");
const pagination_module_1 = require("../common/pagination/pagination.module");
const search_module_1 = require("../common/search/search.module");
const filter_module_1 = require("../common/filter/filter.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController, products_controller_1.AdminProductController],
        providers: [product_service_1.ProductService],
        imports: [
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, category_entity_1.Category]),
            categories_module_1.CategoriesModule,
            suggestions_module_1.SuggestionsModule,
            tags_module_1.TagsModule,
            pagination_module_1.PaginationModule,
            search_module_1.SearchModule,
            filter_module_1.FilterModule,
        ],
        exports: [product_service_1.ProductService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map