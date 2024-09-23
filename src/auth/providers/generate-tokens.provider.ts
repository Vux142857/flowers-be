import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { ActiveUserPayload } from '../interfaces/active-user-payload';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserPayload>>(
        user.id,
        this.jwtConfiguration.accessTokenExpiresIn,
        {
          email: user.email,
          roles: user.roles,
          status: user.status,
        },
      ),
      // Refresh token is not signed with any payload
      this.signToken(user.id, this.jwtConfiguration.refreshTokenExpiresIn),
    ]);
    return { accessToken, refreshToken };
  }
}
