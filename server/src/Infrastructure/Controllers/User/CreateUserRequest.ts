import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
