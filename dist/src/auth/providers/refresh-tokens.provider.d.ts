import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UserService } from '../../users/providers/users.service';
export declare class RefreshTokensProvider {
    private readonly jwtService;
    private readonly jwtConfiguration;
    private readonly generateTokensProvider;
    private readonly userService;
    constructor(jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>, generateTokensProvider: GenerateTokensProvider, userService: UserService);
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private epochTimeToRemaining;
}
