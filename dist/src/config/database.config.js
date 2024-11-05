"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC == 'true' ? true : false,
    autoLoadEntities: process.env.DATABASE_AUTOLOAD_ENTITIES == 'true' ? true : false,
}));
//# sourceMappingURL=database.config.js.map