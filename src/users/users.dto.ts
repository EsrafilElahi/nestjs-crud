import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
}
