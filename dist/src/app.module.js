"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const access_token_guard_1 = require("./auth/guards/authentication/access-token.guard");
const authentication_guard_1 = require("./auth/guards/authentication/authentication.guard");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const app_config_1 = require("./config/app.config");
const database_config_1 = require("./config/database.config");
const environment_validation_1 = require("./config/environment.validation");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./auth/config/jwt.config");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const suggestions_module_1 = require("./suggestions/suggestions.module");
const orders_module_1 = require("./orders/orders.module");
const tags_module_1 = require("./tags/tags.module");
const coupons_module_1 = require("./coupons/coupons.module");
const pagination_module_1 = require("./common/pagination/pagination.module");
const search_module_1 = require("./common/search/search.module");
const filter_module_1 = require("./common/filter/filter.module");
const ENV = process.env.NODE_ENV || '';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: !ENV ? '.env' : `.env.${ENV}`,
                load: [app_config_1.default, database_config_1.default],
                validationSchema: environment_validation_1.default,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    console.log({
                        type: 'postgres',
                        host: configService.get('database.host'),
                        port: configService.get('database.port'),
                        username: configService.get('database.username'),
                        database: configService.get('database.database'),
                        synchronize: configService.get('database.synchronize'),
                        autoLoadEntities: configService.get('database.autoLoadEntities'),
                    });
                    return {
                        type: 'postgres',
                        host: configService.get('database.host'),
                        port: +configService.get('database.port'),
                        username: configService.get('database.username'),
                        password: configService.get('database.password'),
                        database: configService.get('database.database'),
                        synchronize: configService.get('database.synchronize'),
                        autoLoadEntities: configService.get('database.autoLoadEntities'),
                        JWT_SECRET: configService.get('jwt.secret'),
                        JWT_AUDIENCE: configService.get('jwt.audience'),
                        JWT_ISSUER: configService.get('jwt.issuer'),
                        JWT_EXPIRES_IN: configService.get('jwt.accessTokenExpiresIn'),
                        JWT_REFRESH_EXPIRES_IN: configService.get('jwt.refreshTokenExpiresIn'),
                        GOOGLE_CLIENT_ID: configService.get('jwt.googleClientId'),
                        GOOGLE_CLIENT_SECRET: configService.get('jwt.googleClientSecret'),
                    };
                },
            }),
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
            suggestions_module_1.SuggestionsModule,
            orders_module_1.OrdersModule,
            tags_module_1.TagsModule,
            coupons_module_1.CouponsModule,
            pagination_module_1.PaginationModule,
            search_module_1.SearchModule,
            filter_module_1.FilterModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: authentication_guard_1.AuthenticationGuard,
            },
            access_token_guard_1.AccessTokenGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map