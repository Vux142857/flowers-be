"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    environment: process.env.NODE_ENV || 'production',
}));
//# sourceMappingURL=app.config.js.map