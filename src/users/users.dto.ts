import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @MaxLength(20, { message: 'Name should not exceed 20 characters' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  readonly email: string;
}
