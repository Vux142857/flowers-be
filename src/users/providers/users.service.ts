import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(limit: number, page: number) {
    return await this.userRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    return await this.userRepository.save(createUserDto);
  }

  public updateUser(id: string, patchUserDto: PatchUserDto) {
    return {
      id,
      ...patchUserDto,
    };
  }

  public deleteUser(id: string) {
    return {
      id,
    };
  }
}
