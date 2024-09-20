import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from './auth/guards/authentication/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// Configs
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
// Import Enitities/Modules
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentsModule } from './payments/payments.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { OrdersModule } from './orders/orders.module';
import { TagsModule } from './tags/tags.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { CouponsModule } from './coupons/coupons.module';
import { PaginationModule } from './common/pagination/pagination.module';

const ENV = process.env.NODE_ENV || '';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log({
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          database: configService.get('database.database'),
          synchronize: configService.get('database.synchronize'),
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          JWT_SECRET: configService.get('jwt.JWT_SECRET'),
          JWT_AUDIENCE: configService.get('jwt.JWT_AUDIENCE'),
          JWT_ISSUER: configService.get('jwt.JWT_ISSUER'),
          JWT_EXPIRES_IN: configService.get('jwt.JWT_ACCESS_TOKEN_TTL'),
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
        };
      },
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PaymentsModule,
    SuggestionsModule,
    OrdersModule,
    TagsModule,
    OrderItemsModule,
    CouponsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
