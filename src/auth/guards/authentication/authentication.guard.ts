import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTH_TYPE_KEY,
  REQUEST_USER_KEY,
} from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token.guard';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const authType = this.reflector.getAllAndOverride<AuthType>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (authType === AuthType.NONE) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return user;
  }
}
