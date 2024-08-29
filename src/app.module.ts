import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from './payments/payments.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { OrdersModule } from './orders/orders.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Product, Category, Tag],
        autoLoadEntities: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'vu142857',
        database: 'flowers',
        synchronize: true, // false in production
      }),
    }),
    PaymentsModule,
    SuggestionsModule,
    OrdersModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
