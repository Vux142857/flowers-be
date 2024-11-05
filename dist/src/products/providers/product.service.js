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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_provider_1 = require("../../common/pagination/providers/pagination.provider");
const search_provider_1 = require("../../common/search/providers/search.provider");
const statusType_enum_1 = require("../../common/statusType.enum");
const filter_provider_1 = require("../../common/filter/providers/filter.provider");
let ProductService = class ProductService {
    constructor(productRepository, paginationProvider, searchProvider, filterProvider) {
        this.productRepository = productRepository;
        this.paginationProvider = paginationProvider;
        this.searchProvider = searchProvider;
        this.filterProvider = filterProvider;
    }
    async getProducts(limit, page) {
        return await this.paginationProvider.paginateQuery({ limit, page }, this.productRepository);
    }
    async getProductsByStatus(limit, page, status) {
        return await this.paginationProvider.paginateQuery({ limit, page, status }, this.productRepository);
    }
    async filterProducts(limit, page, category, status = statusType_enum_1.StatusType.ACTIVE) {
        return await this.filterProvider.filterAndPaginate({ limit, page, status }, this.productRepository, { category, status });
    }
    async searchProducts(paginationQuery, fields, query) {
        return await this.searchProvider.searchAndPaginate(paginationQuery, this.productRepository, fields, query);
    }
    async getProductById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    async countProducts(query) {
        return await this.productRepository.count({ where: query });
    }
    async createProduct(payload, category, tags) {
        return tags && tags.length > 0
            ? await this.productRepository.save({
                ...payload,
                slug: payload.name.toLowerCase().replace(/ /g, '-'),
                tags,
                category,
            })
            : await this.productRepository.save({
                ...payload,
                slug: payload.name.toLowerCase().replace(/ /g, '-'),
                category,
                tags: null,
            });
    }
    async updateProduct(id, payload, category, tags) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        Object.assign(product, payload);
        product.category = category ? category : product.category;
        product.tags = tags && tags.length > 0 ? tags : null;
        return this.productRepository.save(product);
    }
    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
    async checkStock(productId, quantity) {
        const product = await this.getProductById(productId);
        return product.remaining >= quantity;
    }
    async decreaseStock(productId, quantity) {
        const product = await this.getProductById(productId);
        if (product.remaining < quantity) {
            throw new Error(`Insufficient stock for product ${product.name}`);
        }
        product.remaining -= quantity;
        await this.productRepository.save(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pagination_provider_1.PaginationProvider,
        search_provider_1.SearchProvider,
        filter_provider_1.FilterProvider])
], ProductService);
//# sourceMappingURL=product.service.js.map