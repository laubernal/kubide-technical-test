import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SaveMessageRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '786c3648-fec0-419f-8131-157d02d58d38',
    description: 'The id of the message',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '786c3648-fec0-419f-8131-157d02d58d38',
    description: 'The id of the user sending the message',
  })
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '786c3648-fec0-419f-8131-157d02d58d38',
    description: 'The id of the user receiving the message',
  })
  receiverId: string;

  @IsEmail()
  @ApiProperty({
    example: '¡Hola!',
    description: 'The message the user is sending',
  })
  message: string;
}
