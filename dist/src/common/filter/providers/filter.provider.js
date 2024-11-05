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
exports.FilterProvider = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const url_1 = require("url");
let FilterProvider = class FilterProvider {
    constructor(request) {
        this.request = request;
        this.buildUrlWithQueryParams = (filtersObj, newUrl, page, limit) => {
            newUrl.searchParams.set('page', page.toString());
            newUrl.searchParams.set('limit', limit.toString());
            Object.keys(filtersObj).forEach((key) => {
                if (filtersObj[key]) {
                    newUrl.searchParams.set(key, filtersObj[key]);
                }
            });
            return newUrl.href;
        };
    }
    async filterAndPaginate(filterQuery, repository, filters) {
        let query = filterQuery.status
            ? { status: filterQuery.status }
            : {};
        query = { ...query, ...filters };
        if (filters.category) {
            query['category.id'] = filters.category;
            delete query['category'];
        }
        const [repositories, totalItems] = await Promise.all([
            repository.find({
                where: query,
                skip: (filterQuery.page - 1) * filterQuery.limit,
                take: filterQuery.limit,
                order: { createdAt: 'DESC' },
            }),
            repository.count({
                where: query,
            }),
        ]);
        const baseUrl = this.request.protocol + '://' + this.request.get('host') + '/';
        const newUrl = new url_1.URL(this.request.url, baseUrl);
        const totalPage = Math.ceil(totalItems / filterQuery.limit);
        const nextPage = totalPage === filterQuery.page ? filterQuery.page : filterQuery.page + 1;
        const previousPage = filterQuery.page === 1 ? 1 : filterQuery.page - 1;
        const result = {
            data: repositories,
            meta: {
                totalItems,
                itemsPerPage: filterQuery.limit,
                currentPage: filterQuery.page,
                totalPages: totalPage,
            },
            links: {
                first: this.buildUrlWithQueryParams(filters, newUrl, 1, filterQuery.limit),
                previous: this.buildUrlWithQueryParams(filters, newUrl, previousPage, filterQuery.limit),
                next: this.buildUrlWithQueryParams(filters, newUrl, nextPage, filterQuery.limit),
                last: this.buildUrlWithQueryParams(filters, newUrl, totalPage, filterQuery.limit),
            },
        };
        return result;
    }
};
exports.FilterProvider = FilterProvider;
exports.FilterProvider = FilterProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], FilterProvider);
//# sourceMappingURL=filter.provider.js.map