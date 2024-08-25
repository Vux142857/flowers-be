import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  public findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
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
}