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
    return await this.userRepository.save(createdUser);
  }

  updateUser(userDto: CreateUserDto) {
    const user = this.users[userDto.index];
    if (!user) {
      throw new NotFoundException();
    }
    this.users[userDto.index] = userDto.name;

    return this.users;
  }

  deleteUser(index: number) {
    const user = this.users[index];
    if (!user) {
      throw new NotFoundException();
    }

    delete this.users[index];

    return this.users;
  }
}
