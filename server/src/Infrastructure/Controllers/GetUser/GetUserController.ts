import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { USERS_SWAGGER_TAG } from 'src/Constants';

@ApiBearerAuth()
@ApiTags(USERS_SWAGGER_TAG)
@Controller()
export class GetUserController {
  constructor(private readonly getUserHandler: GetUserHandler) {}

  @UseGuards(AuthGuard)
  @Get('/api/users/:id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved succesfully',
  })
  public async get(
    @Param() params: GetUserParams,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.getUserHandler.execute(params);

      const response = new KubideApiResponse(user, {
        success: true,
        error: null,
      });

      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      if (error instanceof RecordNotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).json(errorResponse);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
