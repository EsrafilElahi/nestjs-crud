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
}
