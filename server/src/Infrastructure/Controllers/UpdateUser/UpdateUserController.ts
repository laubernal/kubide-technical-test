import { Body, Controller, HttpStatus, Param, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { UpdateUserRequest } from './UpdateUserRequest';
import { UpdateUserHandler } from 'src/Application/UpdateUser/UpdateUserHandler';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';
import { UpdateUserParams } from './UpdateUserParams';
import { USERS_SWAGGER_TAG } from 'src/Constants';

@ApiBearerAuth()
@ApiTags(USERS_SWAGGER_TAG)
@Controller()
export class UpdateUserController {
  constructor(private readonly updateUserHandler: UpdateUserHandler) {}

  @UseGuards(AuthGuard)
  @Put('/api/users/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated succesfully' })
  public async put(
    @Param() params: UpdateUserParams,
    @Body() body: UpdateUserRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.updateUserHandler.execute({ ...params, ...body });

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

      if (error instanceof RecordNotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).json(errorResponse);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
