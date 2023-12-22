import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':index')
  getOne(@Param('index') index: number) {
    return this.usersService.getOne(index);
  }

  @Post()
  createUser(@Body() userDto: any) {
    return this.usersService.createUser(userDto);
  }

  @Put()
  updateUser(@Body() userDto: any) {
    return this.usersService.updateUser(userDto);
  }

  @Delete(':index')
  deleteUser(@Param('index') index: number) {
    return this.usersService.deleteUser(index);
  }
}
