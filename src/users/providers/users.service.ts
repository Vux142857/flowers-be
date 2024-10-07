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
import { Not, Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { SearchProvider } from 'src/common/search/providers/search.provider';
import { Role } from 'src/auth/enums/role-type.enum';
import { FilterProvider } from 'src/common/filter/providers/filter.provider';
import { StatusType } from 'src/common/statusType.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { GetUserDto } from '../dtos/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly paginationProvider: PaginationProvider,

    private readonly searchProvider: SearchProvider,

    private readonly filterProvider: FilterProvider,

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

  async getAllCustomers(limit: number, page: number, status: StatusType) {
    return await this.filterProvider.filterAndPaginate<User>(
      { limit, page },
      this.userRepository,
      { roles: Role.CUSTOMER, status },
    );
  }

  async filterUsers(limit: number, page: number, filterUserDto: GetUserDto) {
    const { status } = filterUserDto;
    return await this.filterProvider.filterAndPaginate<User>(
      { limit, page, status },
      this.userRepository,
      { status },
    );
  }

  async countUsers(query: Record<string, string>) {
    return await this.userRepository.count({
      where: {
        ...query,
        roles: Not(Role.ADMIN),
      },
    });
  }

  async searchUsers(
    paginationQuery: PaginationQueryDto,
    fields: string[],
    query: string,
  ) {
    return await this.searchProvider.searchAndPaginate<User>(
      paginationQuery,
      this.userRepository,
      fields,
      query,
    );
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
