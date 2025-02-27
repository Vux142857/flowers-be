import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signIn.dto';
import { SignUpDto } from '../dtos/signUp.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly refreshTokenProvider: RefreshTokensProvider,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    const isValid = await this.hashingProvider.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return await this.generateTokensProvider.generateTokens(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const { password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }
    const newUser = await this.userService.createUser(signUpDto);
    if (!newUser) {
      throw new UnauthorizedException('Invalid user');
    }
    return await this.generateTokensProvider.generateTokens(newUser);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
