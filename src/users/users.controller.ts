import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UserService) { }

  @Get('/:id')
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number | undefined,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Patch()
  public patchUser(
    @Body() patchUserDto: PatchUserDto,
  ) {
    console.log(patchUserDto instanceof PatchUserDto);
    return 'User updated';
  }
}
