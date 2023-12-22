import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':index')
  getOne(@Param('index', ParseIntPipe) index: number) {
    return this.usersService.getOne(index);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Put()
  updateUser(@Body() userDto: CreateUserDto) {
    return this.usersService.updateUser(userDto);
  }

  @Delete(':index')
  deleteUser(@Param('index', ParseIntPipe) index: number) {
    return this.usersService.deleteUser(index);
  }
}
