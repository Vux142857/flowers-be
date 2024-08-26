import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { GetByParamDto } from 'src/common/get-by-param';
import { GetUserDto } from './dtos/get-user.dto';
import { RequireParamDto } from 'src/common/require-param';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UserService) { }

  @Get('/:id')
  public getUsers(
    @Param() getUserParamDto: GetByParamDto,
    @Query() getUserDto: GetUserDto,
  ) {
    const { id } = getUserParamDto;
    const { limit, page } = getUserDto;
    return id ? this.userService.findUserById(id) : this.userService.findAll(limit, page);
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  public patchUser(
    @Param() patchUserParamDto: RequireParamDto,
    @Body() patchUserDto: PatchUserDto,
  ) {
    const { id } = patchUserParamDto;
    return this.userService.updateUser(id, patchUserDto);
  }
}
