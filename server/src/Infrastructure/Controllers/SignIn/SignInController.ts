import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import { SignInHandler } from 'src/Application/SignIn/SignInHandler';
import { SignInRequest } from './SignInRequest';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';
import { InvalidCredentialsError } from 'src/Domain/Errors/InvalidCredentialsError';

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

      const response = new KubideApiResponse(null, {
        success: true,
        error: null,
      });

      const token = jwt.sign(
        {
          id: signInResponse.id,
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
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      let statusCode = 400;

      if (error instanceof RecordNotFoundError) {
        statusCode = 404;
      }

      if (error instanceof InvalidCredentialsError) {
        statusCode = 400;
      }

      return res.status(statusCode).json(errorResponse);
    }
  }
}
