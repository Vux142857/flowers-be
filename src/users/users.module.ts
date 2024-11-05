import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from '../common/pagination/pagination.module';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { SearchModule } from '../common/search/search.module';
import { FilterModule } from '../common/filter/filter.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, FindOneByGoogleIdProvider, CreateGoogleUserProvider],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
    SearchModule,
    FilterModule,
  ],
  exports: [UserService],
})
export class UsersModule {}
