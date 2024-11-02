import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '786c3648-fec0-419f-8131-157d02d58d38',
    description: 'The id of the user',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Laura Bernal',
    description: 'The name of the user',
  })
  name: string;

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
