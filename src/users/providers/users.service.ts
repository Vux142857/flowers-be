import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly paginationProvider: PaginationProvider,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  async findAll(limit: number, page: number) {
    return await this.paginationProvider.paginateQuery<User>(
      { limit, page },
      this.userRepository,
    );
  }

  async findUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.userRepository.create(createUserDto);
    newUser.password = await this.hashingProvider.hash(newUser.password);
    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }

  async updateUser(id: string, patchUserDto: PatchUserDto) {
    return await this.userRepository.update(id, patchUserDto);
  }

  public deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
