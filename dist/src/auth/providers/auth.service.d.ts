import { UserService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signIn.dto';
import { SignUpDto } from '../dtos/signUp.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
export declare class AuthService {
    private readonly userService;
    private readonly hashingProvider;
    private readonly generateTokensProvider;
    private readonly jwtConfiguration;
    private readonly refreshTokenProvider;
    constructor(userService: UserService, hashingProvider: HashingProvider, generateTokensProvider: GenerateTokensProvider, jwtConfiguration: ConfigType<typeof jwtConfig>, refreshTokenProvider: RefreshTokensProvider);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signUp(signUpDto: SignUpDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
