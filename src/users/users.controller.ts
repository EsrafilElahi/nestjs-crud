import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string[] {
    return this.usersService.getUsers();
  }

  @Get(':index')
  getOne(@Param('index') index: number): string {
    return this.usersService.getOne(index);
  }
}
