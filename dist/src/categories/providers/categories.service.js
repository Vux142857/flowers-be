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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../category.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const pagination_provider_1 = require("../../common/pagination/providers/pagination.provider");
const search_provider_1 = require("../../common/search/providers/search.provider");
const filter_provider_1 = require("../../common/filter/providers/filter.provider");
let CategoryService = class CategoryService {
    constructor(categoryRepository, paginationProvider, searchProvider, filterProvider) {
        this.categoryRepository = categoryRepository;
        this.paginationProvider = paginationProvider;
        this.searchProvider = searchProvider;
        this.filterProvider = filterProvider;
    }
    async getCategories(limit, page) {
        return await this.paginationProvider.paginateQuery({ limit, page }, this.categoryRepository);
    }
    async getCategory(id) {
        return await this.categoryRepository.findOneBy({ id });
    }
    async searchCategories(paginationQuery, fields, query) {
        return await this.searchProvider.searchAndPaginate(paginationQuery, this.categoryRepository, fields, query);
    }
    async filterCategories(limit, page, filterProductDto) {
        const { status } = filterProductDto;
        return await this.filterProvider.filterAndPaginate({ limit, page, status }, this.categoryRepository, { status });
    }
    async countCategories(query) {
        return await this.categoryRepository.count({ where: query });
    }
    async createCategory(payload) {
        return await this.categoryRepository.save(payload);
    }
    async updateCategory(id, payload) {
        return await this.categoryRepository.update(id, payload);
    }
    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        pagination_provider_1.PaginationProvider,
        search_provider_1.SearchProvider,
        filter_provider_1.FilterProvider])
], CategoryService);
//# sourceMappingURL=categories.service.js.map