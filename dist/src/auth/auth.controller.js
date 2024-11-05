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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./providers/auth.service");
const signIn_dto_1 = require("./dtos/signIn.dto");
const signUp_dto_1 = require("./dtos/signUp.dto");
const auth_type_enum_1 = require("./enums/auth-type.enum");
const auth_decorator_1 = require("./decorator/auth.decorator");
const refresh_token_dto_1 = require("./dtos/refresh-token.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    async refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.NONE),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.NONE),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map