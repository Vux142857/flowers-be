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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const typeorm_2 = require("typeorm");
const hashing_provider_1 = require("../../auth/providers/hashing.provider");
const pagination_provider_1 = require("../../common/pagination/providers/pagination.provider");
const find_one_by_google_id_provider_1 = require("./find-one-by-google-id.provider");
const create_google_user_provider_1 = require("./create-google-user.provider");
const search_provider_1 = require("../../common/search/providers/search.provider");
const role_type_enum_1 = require("../../auth/enums/role-type.enum");
const filter_provider_1 = require("../../common/filter/providers/filter.provider");
let UserService = class UserService {
    constructor(userRepository, hashingProvider, paginationProvider, searchProvider, filterProvider, findOneByGoogleIdProvider, createGoogleUserProvider) {
        this.userRepository = userRepository;
        this.hashingProvider = hashingProvider;
        this.paginationProvider = paginationProvider;
        this.searchProvider = searchProvider;
        this.filterProvider = filterProvider;
        this.findOneByGoogleIdProvider = findOneByGoogleIdProvider;
        this.createGoogleUserProvider = createGoogleUserProvider;
    }
    async findAll(limit, page) {
        return await this.paginationProvider.paginateQuery({ limit, page }, this.userRepository);
    }
    async findUserById(id) {
        return await this.userRepository.findOneBy({ id });
    }
    async getAllCustomers(limit, page, status) {
        return await this.filterProvider.filterAndPaginate({ limit, page }, this.userRepository, { roles: role_type_enum_1.Role.CUSTOMER, status });
    }
    async filterUsers(limit, page, filterUserDto) {
        const { status } = filterUserDto;
        return await this.filterProvider.filterAndPaginate({ limit, page, status }, this.userRepository, { status, roles: role_type_enum_1.Role.CUSTOMER });
    }
    async countUsers(query) {
        return await this.userRepository.count({
            where: {
                ...query,
                roles: (0, typeorm_2.Not)(role_type_enum_1.Role.ADMIN),
            },
        });
    }
    async searchUsers(paginationQuery, fields, query) {
        return await this.searchProvider.searchAndPaginate(paginationQuery, this.userRepository, fields, query);
    }
    async createUser(createUserDto) {
        const existingUser = await this.userRepository.findOneBy({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const newUser = await this.userRepository.create(createUserDto);
        newUser.password = await this.hashingProvider.hash(newUser.password);
        return await this.userRepository.save(newUser);
    }
    async findOneByEmail(email) {
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return existingUser;
    }
    async updateUser(id, patchUserDto) {
        return await this.userRepository.update(id, patchUserDto);
    }
    deleteUser(id) {
        return this.userRepository.delete(id);
    }
    async findOneByGoogleId(googleId) {
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }
    async createGoogleUser(googleUser) {
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => hashing_provider_1.HashingProvider))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider,
        pagination_provider_1.PaginationProvider,
        search_provider_1.SearchProvider,
        filter_provider_1.FilterProvider,
        find_one_by_google_id_provider_1.FindOneByGoogleIdProvider,
        create_google_user_provider_1.CreateGoogleUserProvider])
], UserService);
//# sourceMappingURL=users.service.js.map