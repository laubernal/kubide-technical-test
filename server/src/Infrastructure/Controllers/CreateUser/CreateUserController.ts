import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import { CreateUserRequest } from './CreateUserRequest';
import { CreateUserHandler } from 'src/Application/CreateUser/CreateUserHandler';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AUTH_SWAGGER_TAG } from 'src/Constants';
import { UserAlreadyExistsError } from 'src/Domain/Errors/UserAlreadyExists';

@ApiBearerAuth()
@ApiTags(AUTH_SWAGGER_TAG)
@Controller()
export class CreateUserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @Post('/api/auth/register')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User already exists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User created succesfully' })
  public async post(
    @Body() body: CreateUserRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.createUserHandler.execute(body);

      const response = new KubideApiResponse(null, {
        success: true,
        error: null,
      });

      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      if (error instanceof UserAlreadyExistsError) {
        return res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
