import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) { }

  async login(email: string, password: string) {
    // const user = await this.userService.findByEmail(email);
    // if (user && user.password === password) {
    //   return user;
    // }
    // return null;
  }

  public isAuth(token: string) {
    // return this.userService.isAuth(token);
    return true;
  }
}
