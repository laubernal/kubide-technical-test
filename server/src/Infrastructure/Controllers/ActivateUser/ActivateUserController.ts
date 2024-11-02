import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { UpdateUserHandler } from 'src/Application/UpdateUser/UpdateUserHandler';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';
import { ActivateUserParams } from './ActivateUserParams';
import { ActivateUserRequest } from './ActivateUserRequest';
import { USERS_SWAGGER_TAG } from 'src/Constants';

@ApiBearerAuth()
@ApiTags(USERS_SWAGGER_TAG)
@Controller()
export class ActivateUserController {
  constructor(private readonly updateUserHandler: UpdateUserHandler) {}

  @UseGuards(AuthGuard)
  @Put('/api/users/:id/active')
  @ApiOperation({ summary: 'Change the active state of a user' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({
    status: 200,
    description: 'User active state changed succesfully',
  })
  public async put(
    @Param() params: ActivateUserParams,
    @Body() body: ActivateUserRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.updateUserHandler.execute({ ...params, ...body });

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

      if (error instanceof RecordNotFoundError) {
        statusCode = 404;
      }

      return res.status(statusCode).json(errorResponse);
    }
  }
}
