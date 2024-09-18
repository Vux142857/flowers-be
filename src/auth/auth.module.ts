import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
