import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = ['esrafil', 'tom', 'charlize', 'margo'];

  getUsers(): string[] {
    return this.users;
  }

  getOne(index: number) {
    const user = this.users[index];
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  createUser(userDto: any) {
    if (!userDto) {
      throw new NotFoundException();
    }
    this.users.push(userDto?.name);

    return this.users;
  }

  updateUser(userDto: any) {
    if (!userDto) {
      throw new NotFoundException();
    }
    this.users[userDto.index] = userDto.name;

    return this.users;
  }

  deleteUser(index: number) {
    if (!index) {
      throw new NotFoundException();
    }

    delete this.users[index];

    return this.users;
  }
}
