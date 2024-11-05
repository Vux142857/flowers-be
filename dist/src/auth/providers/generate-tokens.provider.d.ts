import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../users/user.entity';
export declare class GenerateTokensProvider {
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signToken<T>(userId: string, expiresIn: number, payload?: T): Promise<string>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
