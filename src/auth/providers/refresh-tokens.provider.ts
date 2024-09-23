import {
  forwardRef,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenPayload } from '../interfaces/refresh-token-payload.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserPayload } from '../interfaces/active-user-payload.interface';
import { UserService } from 'src/users/providers/users.service';

export class RefreshTokensProvider {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });
    const { exp, sub } = payload as RefreshTokenPayload;
    // Check valid user
    const user = await this.userService.findUserById(sub);
    if (!user) {
      throw new NotFoundException('Invalid user');
    }
    // Generate new refresh token with remaining time
    const remainingTime = this.epochTimeToRemaining(exp);
    if (remainingTime <= 0) {
      throw new UnauthorizedException('Refresh token expired');
    }
    const [accessToken, newRefreshToken] = await Promise.all([
      this.generateTokensProvider.signToken<Partial<ActiveUserPayload>>(
        user.id,
        this.jwtConfiguration.accessTokenExpiresIn,
        {
          email: user.email,
          roles: user.roles,
          status: user.status,
        },
      ),
      this.generateTokensProvider.signToken(user.id, remainingTime),
    ]);
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  // Utilize to extract exp of RefreshToken
  private epochTimeToRemaining(exp: number): number {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const remainingTime = exp - currentTimeInSeconds;
    return remainingTime > 0 ? remainingTime : 0;
  }
}
