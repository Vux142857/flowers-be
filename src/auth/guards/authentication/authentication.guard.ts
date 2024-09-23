import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import {
  AUTH_TYPE_KEY,
  REQUEST_USER_KEY,
} from 'src/auth/constants/auth.constants';
import { StatusType } from 'src/common/statusType.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // Set the default Auth Type
  private static readonly defaultAuthType = AuthType.BEARER;

  // Create authTypeGuardMap
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.BEARER]: this.accessTokenGuard,
    [AuthType.NONE]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // Declare the default error
    let error = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      if (canActivate && authTypes.includes(AuthType.BEARER)) {
        const request = context.switchToHttp().getRequest();
        const authenticatedUser = request[REQUEST_USER_KEY];
        return authenticatedUser?.status == StatusType.ACTIVE ? true : false;
      } else if (canActivate && authTypes.includes(AuthType.NONE)) {
        return true;
      }
    }

    throw error;
  }
}
