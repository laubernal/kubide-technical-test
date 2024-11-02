import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'p@$sw0rd',
    description: 'The password of the user',
  })
  password: string;
}
