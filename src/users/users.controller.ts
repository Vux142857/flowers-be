import { Body, Controller, Delete, Get, Headers, Ip, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { GetByParamDto } from 'src/common/get-by-param';
import { GetUserDto } from './dtos/get-user.dto';
import { RequireParamDto } from 'src/common/require-param';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(private readonly userService: UserService) { }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all users or get only one user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully found.' })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
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

  @Delete('/:id')
  public deleteUser(@Param() patchUserParamDto: RequireParamDto) {
    const { id } = patchUserParamDto;
    return this.userService.deleteUser(id);
  }
}
