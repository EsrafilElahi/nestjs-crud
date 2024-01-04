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
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipThrottle({ default: false }) // don't skip rate-limit
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // customize throttle short
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Put()
  updateUser(@Body() userDto: CreateUserDto) {
    return this.usersService.updateUser(userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
