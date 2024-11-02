import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppResponse } from 'src/AppResponse';
import { SignInHandler } from 'src/Application/User/SignInHandler';
import { SignInRequest } from './SignInRequest';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class SignInController {
  constructor(
    private readonly signInHandler: SignInHandler,
    private readonly config: ConfigService,
  ) {}

  @Post('/api/auth/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 200, description: 'Signed in succesfully' })
  public async post(
    @Body() body: SignInRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const signInResponse = await this.signInHandler.execute(body);

      const response = new AppResponse(null, {
        success: true,
        error: null,
      });

      const token = jwt.sign(
        {
          name: signInResponse.name,
          email: signInResponse.email,
        },
        this.config.get<string>('JWT_KEY')!,
      );

      return res
        .status(200)
        .setHeader('Authorization', `Bearer ${token}`)
        .json(response);
    } catch (error: any) {
      const errorResponse = new AppResponse(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(errorResponse);
    }
  }
}
