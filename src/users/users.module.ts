import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { SearchModule } from 'src/common/search/search.module';

@Module({
  controllers: [UsersController],
  providers: [UserService, FindOneByGoogleIdProvider, CreateGoogleUserProvider],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
    SearchModule,
  ],
  exports: [UserService],
})
export class UsersModule {}
