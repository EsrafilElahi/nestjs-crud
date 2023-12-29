import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async createUser(userDto: CreateUserDto) {
    if (!userDto) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const createdUser = await this.userRepository.create(userDto);
    await this.userRepository.save(createdUser);
    const users = await this.userRepository.find();
    return users;
  }

  async updateUser(userDto: CreateUserDto) {
    await this.userRepository.save(userDto);
    return { msg: 'updated user successfully', user: userDto };
  }

  deleteUser(id: number) {
    const foundUser = this.userRepository.findOne({ where: { id: id } });
    if (!foundUser) {
      throw new NotFoundException();
    }

    this.userRepository.delete(id);
    return 'user deleted!';
    // this.userRepository.remove(user); ---> this is for delete user with userData
    // this.userRepository.remove([user1, user2]); ---> this is for delete user with userData of array
  }
}
