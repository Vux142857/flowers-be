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
  SetMetadata,
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
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/authentication/roles.guard';
import { Roles } from 'src/auth/decorator/authorization/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users or get only one user by id' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully found.',
  })
  @ApiParam({ name: 'id', type: 'string', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @Get('/:id?')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @SetMetadata('isPublic', true)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

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

  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('/:id')
  public deleteUser(@Param() deleteUserParamDto: RequireParamDto) {
    this.userService.deleteUser(deleteUserParamDto.id);
    return {
      message: 'User deleted successfully',
    };
  }
}
