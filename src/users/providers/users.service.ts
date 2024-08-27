import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  public findAll(limit: number, page: number) {
    return [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
      }
    ];
  }

  public findUserById(id: string) {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    };
  }

  public createUser(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
    }
  }

  public updateUser(id: string, patchUserDto: PatchUserDto) {
    return {
      id,
      ...patchUserDto,
    }
  }

  public deleteUser(id: string) {
    return {
      id,
    }
  }
}