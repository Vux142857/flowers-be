import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/auth/guards/authentication/authentication.guard';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [UserService],
})
export class UsersModule {}
