import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
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
