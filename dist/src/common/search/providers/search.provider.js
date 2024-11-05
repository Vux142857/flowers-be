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
exports.SearchProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const core_1 = require("@nestjs/core");
const url_1 = require("url");
const role_type_enum_1 = require("../../../auth/enums/role-type.enum");
let SearchProvider = class SearchProvider {
    constructor(request) {
        this.request = request;
    }
    async searchAndPaginate(paginationQuery, repository, searchFields, searchTerm) {
        const entityName = repository.metadata.name;
        let query = paginationQuery.status
            ? [{ status: paginationQuery.status }]
            : [];
        if (searchTerm) {
            const searchConditions = searchFields.map((field) => ({
                [field]: (0, typeorm_1.Like)(`%${searchTerm}%`),
            }));
            query = [...query, ...searchConditions];
        }
        if (entityName === 'User') {
            query.push({
                roles: (0, typeorm_1.Not)((0, typeorm_1.Any)([role_type_enum_1.Role.ADMIN])),
            });
        }
        const [repositories, totalItems] = await Promise.all([
            repository.find({
                where: query.length > 0 ? query : undefined,
                skip: (paginationQuery.page - 1) * paginationQuery.limit,
                take: paginationQuery.limit,
                order: { createdAt: 'DESC' },
            }),
            repository.count({
                where: query.length > 0 ? query : undefined,
            }),
        ]);
        const baseUrl = this.request.protocol + '://' + this.request.get('host') + '/';
        const newUrl = new url_1.URL(this.request.url, baseUrl);
        const totalPage = Math.ceil(totalItems / paginationQuery.limit);
        const nextPage = totalPage === paginationQuery.page
            ? paginationQuery.page
            : paginationQuery.page + 1;
        const previousPage = paginationQuery.page === 1 ? 1 : paginationQuery.page - 1;
        const result = {
            data: repositories,
            meta: {
                totalItems,
                itemsPerPage: paginationQuery.limit,
                currentPage: paginationQuery.page,
                totalPages: totalPage,
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?query=${searchTerm}&limit=${paginationQuery.limit}&page=1`,
                previous: `${newUrl.origin}${newUrl.pathname}?query=${searchTerm}&limit=${paginationQuery.limit}&page=${previousPage}`,
                next: `${newUrl.origin}${newUrl.pathname}?query=${searchTerm}&limit=${paginationQuery.limit}&page=${nextPage}`,
                last: `${newUrl.origin}${newUrl.pathname}?query=${searchTerm}&limit=${paginationQuery.limit}&page=${totalPage}`,
            },
        };
        return result;
    }
};
exports.SearchProvider = SearchProvider;
exports.SearchProvider = SearchProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], SearchProvider);
//# sourceMappingURL=search.provider.js.map