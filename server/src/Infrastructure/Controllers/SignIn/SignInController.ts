import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
import { AUTH_SWAGGER_TAG } from 'src/Constants';

@ApiBearerAuth()
@ApiTags(AUTH_SWAGGER_TAG)
@Controller()
export class SignInController {
  constructor(
    private readonly signInHandler: SignInHandler,
    private readonly config: ConfigService,
  ) {}

  @Post('/api/auth/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid credentials' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Signed in succesfully' })
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
        .status(HttpStatus.OK)
        .setHeader('Authorization', `Bearer ${token}`)
        .json(response);
    } catch (error: any) {
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      if (error instanceof RecordNotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).json(errorResponse);
      }

      if (error instanceof InvalidCredentialsError) {
        return res.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
