import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
