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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/providers/users.service");
const hashing_provider_1 = require("./hashing.provider");
const generate_tokens_provider_1 = require("./generate-tokens.provider");
const jwt_config_1 = require("../config/jwt.config");
const refresh_tokens_provider_1 = require("./refresh-tokens.provider");
let AuthService = class AuthService {
    constructor(userService, hashingProvider, generateTokensProvider, jwtConfiguration, refreshTokenProvider) {
        this.userService = userService;
        this.hashingProvider = hashingProvider;
        this.generateTokensProvider = generateTokensProvider;
        this.jwtConfiguration = jwtConfiguration;
        this.refreshTokenProvider = refreshTokenProvider;
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userService.findOneByEmail(email);
        const isValid = await this.hashingProvider.compare(password, user.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return await this.generateTokensProvider.generateTokens(user);
    }
    async signUp(signUpDto) {
        const { password, confirmPassword } = signUpDto;
        if (password !== confirmPassword) {
            throw new common_1.UnauthorizedException('Passwords do not match');
        }
        const newUser = await this.userService.createUser(signUpDto);
        if (!newUser) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        return await this.generateTokensProvider.generateTokens(newUser);
    }
    async refreshToken(refreshTokenDto) {
        return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UserService))),
    __param(3, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [users_service_1.UserService,
        hashing_provider_1.HashingProvider,
        generate_tokens_provider_1.GenerateTokensProvider, void 0, refresh_tokens_provider_1.RefreshTokensProvider])
], AuthService);
//# sourceMappingURL=auth.service.js.map