import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppResponse } from 'src/AppResponse';
import { CreateUserRequest } from './CreateUserRequest';
import { CreateUserHandler } from 'src/Application/User/CreateUserHandler';

@Controller()
export class CreateUserController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @Post('/api/auth/register')
  public async post(
    @Body() body: CreateUserRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.createUserHandler.execute(body);

      const response = new AppResponse(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      const errorResponse = new AppResponse(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(errorResponse);
    }
  }
}
