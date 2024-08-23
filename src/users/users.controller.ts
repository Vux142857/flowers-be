import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get('/:id')
  public getUsers(@Param() params: any, @Query() query: any) {
    console.log(params);
    console.log(query);
    return 'All users';
  }

  @Post()
  public createUser(@Body() body: any) {
    console.log(body);
    return 'User created';
  }

  @Patch()
  public updateUser() {
    return 'User updated';
  }
}
