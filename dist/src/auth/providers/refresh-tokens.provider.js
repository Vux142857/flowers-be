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
exports.RefreshTokensProvider = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
const generate_tokens_provider_1 = require("./generate-tokens.provider");
const users_service_1 = require("../../users/providers/users.service");
let RefreshTokensProvider = class RefreshTokensProvider {
    constructor(jwtService, jwtConfiguration, generateTokensProvider, userService) {
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.generateTokensProvider = generateTokensProvider;
        this.userService = userService;
    }
    async refreshTokens(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        const payload = this.jwtService.verify(refreshToken, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
        });
        const { exp, sub } = payload;
        const user = await this.userService.findUserById(sub);
        if (!user) {
            throw new common_1.NotFoundException('Invalid user');
        }
        const remainingTime = this.epochTimeToRemaining(exp);
        if (remainingTime <= 0) {
            throw new common_1.UnauthorizedException('Refresh token expired');
        }
        const [accessToken, newRefreshToken] = await Promise.all([
            this.generateTokensProvider.signToken(user.id, this.jwtConfiguration.accessTokenExpiresIn, {
                email: user.email,
                roles: user.roles,
                status: user.status,
            }),
            this.generateTokensProvider.signToken(user.id, remainingTime),
        ]);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    epochTimeToRemaining(exp) {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const remainingTime = exp - currentTimeInSeconds;
        return remainingTime > 0 ? remainingTime : 0;
    }
};
exports.RefreshTokensProvider = RefreshTokensProvider;
exports.RefreshTokensProvider = RefreshTokensProvider = __decorate([
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UserService))),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0, generate_tokens_provider_1.GenerateTokensProvider,
        users_service_1.UserService])
], RefreshTokensProvider);
//# sourceMappingURL=refresh-tokens.provider.js.map