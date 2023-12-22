import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = ['esrafil', 'tom', 'charlize', 'margo'];

  getUsers(): string[] {
    return this.users;
  }
}
