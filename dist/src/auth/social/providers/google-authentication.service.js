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
exports.GoogleAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_config_1 = require("../../config/jwt.config");
const google_auth_library_1 = require("google-auth-library");
const generate_tokens_provider_1 = require("../../providers/generate-tokens.provider");
const users_service_1 = require("../../../users/providers/users.service");
let GoogleAuthenticationService = class GoogleAuthenticationService {
    constructor(usersService, jwtConfiguration, generateTokensProvider) {
        this.usersService = usersService;
        this.jwtConfiguration = jwtConfiguration;
        this.generateTokensProvider = generateTokensProvider;
    }
    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
    }
    async authenticate(googleTokenDto) {
        try {
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: googleTokenDto.token,
            });
            const { email, sub: googleId, given_name: firstName, family_name: lastName, } = loginTicket.getPayload();
            const user = await this.usersService.findOneByGoogleId(googleId);
            if (user) {
                return await this.generateTokensProvider.generateTokens(user);
            }
            else {
                const newUser = await this.usersService.createGoogleUser({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    googleId: googleId,
                });
                return await this.generateTokensProvider.generateTokens(newUser);
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.GoogleAuthenticationService = GoogleAuthenticationService;
exports.GoogleAuthenticationService = GoogleAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UserService))),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [users_service_1.UserService, void 0, generate_tokens_provider_1.GenerateTokensProvider])
], GoogleAuthenticationService);
//# sourceMappingURL=google-authentication.service.js.map