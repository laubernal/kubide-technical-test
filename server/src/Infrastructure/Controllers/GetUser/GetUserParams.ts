import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserParams {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '786c3648-fec0-419f-8131-157d02d58d38',
    description: 'The id of the user',
  })
  id: string;
}
