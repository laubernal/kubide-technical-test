import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ActivateUserRequest {
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'If the user is active or not',
  })
  isActive: boolean;
}
