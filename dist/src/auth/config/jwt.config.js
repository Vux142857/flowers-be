"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => {
    return {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenExpiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '7200', 10),
        refreshTokenExpiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
});
//# sourceMappingURL=jwt.config.js.map