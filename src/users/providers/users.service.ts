import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';

@Injectable()
export class UserService {
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
}