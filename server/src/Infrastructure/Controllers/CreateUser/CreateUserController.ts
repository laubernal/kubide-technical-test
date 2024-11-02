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

@ApiBearerAuth()
@ApiTags('users')
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

      return res.status(400).json(errorResponse);
    }
  }
}