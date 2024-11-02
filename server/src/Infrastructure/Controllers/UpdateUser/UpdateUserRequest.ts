import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
//   @IsString()
//   @IsNotEmpty()
//   @ApiProperty({
//     example: '786c3648-fec0-419f-8131-157d02d58d38',
//     description: 'The id of the user',
//   })
//   id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Laura Bernal',
    description: 'The name of the user',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    example: 'p@$sw0rd',
    description: 'The password of the user',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'If the user is active or not',
  })
  isActive: boolean;
}
