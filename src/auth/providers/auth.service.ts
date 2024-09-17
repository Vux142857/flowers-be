import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly hashingProvider: HashingProvider,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    const isValid = await this.hashingProvider.compare(user.password, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return isValid;
  }

  // public isAuth(token: string) {
  //   // return this.userService.isAuth(token);
  //   return true;
  // }
}
