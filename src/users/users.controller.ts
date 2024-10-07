import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { GetByParamDto } from 'src/common/get-by-param';
import { GetUserDto } from './dtos/get-user.dto';
import { RequireParamDto } from 'src/common/require-param';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/authorization/roles.guard';
import { Roles } from 'src/auth/decorator/authorization/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { SearchQueryDto } from 'src/common/search/dtos/search-query.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer')
  public getCustomer(@Query() getUserDto: GetUserDto) {
    const { limit, page, status } = getUserDto;
    return this.userService.getAllCustomers(limit, page, status);
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('search')
  public searchUser(@Query() searchQueryDto: SearchQueryDto) {
    const { limit, page, query } = searchQueryDto;
    return this.userService.searchUsers(
      { limit, page },
      ['name', 'email'],
      query,
    );
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('filter')
  public filterUser(@Query() filterUserDto: GetUserDto) {
    const { limit, page, status } = filterUserDto;
    return this.userService.filterUsers(limit, page, { status });
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('count')
  public countUser(@Query() getUserDto: GetUserDto) {
    const { status } = getUserDto;
    return this.userService.countUsers({ status });
  }

  @ApiOperation({ summary: 'Get all users or get only one user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
  })
  @ApiParam({ name: 'id', type: 'string', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id?')
  public getUsers(
    @Param() getUserParamDto: GetByParamDto,
    @Query() getUserDto: GetUserDto,
  ) {
    const { id } = getUserParamDto;
    const { limit, page } = getUserDto;
    return id
      ? this.userService.findUserById(id)
      : this.userService.findAll(limit, page);
  }

  @Post()
  @Auth(AuthType.BEARER)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Auth(AuthType.BEARER)
  @Patch('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  public patchUser(
    @Param() patchUserParamDto: RequireParamDto,
    @Body() patchUserDto: PatchUserDto,
  ) {
    const { id } = patchUserParamDto;
    const existingUser = this.userService.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.userService.updateUser(id, patchUserDto);
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  public deleteUser(@Param() deleteUserParamDto: RequireParamDto) {
    this.userService.deleteUser(deleteUserParamDto.id);
    return {
      message: 'User deleted successfully',
    };
  }
}
