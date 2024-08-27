import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'vu142857',
      synchronize: true, // false in production 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
