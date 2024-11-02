import { Body, Controller, Post, Res } from '@nestjs/common';
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
import { UserAlreadyExistsError } from 'src/Domain/Errors/UserAlreadyExists';
import { AUTH_SWAGGER_TAG } from 'src/Constants';

@ApiBearerAuth()
@ApiTags(AUTH_SWAGGER_TAG)
@Controller()
export class CreateUserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @Post('/api/auth/register')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  @ApiResponse({ status: 200, description: 'User created succesfully' })
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

      return res.status(200).json(response);
    } catch (error: any) {
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      let statusCode = 400;

      if (error instanceof UserAlreadyExistsError) {
        statusCode = 400;
      }

      return res.status(statusCode).json(errorResponse);
    }
  }
}
