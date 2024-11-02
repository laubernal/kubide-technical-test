import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserHandler } from 'src/Application/GetUser/GetUserHandler';
import { GetUserParams } from './GetUserParams';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class GetUserController {
  constructor(private readonly getUserHandler: GetUserHandler) {}

  @Get('/api/user/:id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 200, description: 'User retrieved succesfully' })
  public async post(
    @Param() params: GetUserParams,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.getUserHandler.execute(params);

      const response = new KubideApiResponse(user, {
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

      if (error instanceof RecordNotFoundError) {
        statusCode = 404;
      }

      return res.status(statusCode).json(errorResponse);
    }
  }
}
