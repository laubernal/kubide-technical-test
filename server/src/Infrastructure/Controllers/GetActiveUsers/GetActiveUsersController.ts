import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { USERS_SWAGGER_TAG } from 'src/Constants';
import { GetActiveUsersHandler } from 'src/Application/GetActiveUsers/GetActiveUsersHandler';

@ApiBearerAuth()
@ApiTags(USERS_SWAGGER_TAG)
@Controller()
export class GetActiveUsersController {
  constructor(private readonly getActiveUsersHandler: GetActiveUsersHandler) {}

  @UseGuards(AuthGuard)
  @Get('/api/users')
  @ApiOperation({ summary: 'Get active users' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users retrieved succesfully' })
  public async get(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const users = await this.getActiveUsersHandler.execute();

      const response = new KubideApiResponse(users, {
        success: true,
        error: null,
      });

      return res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      const errorResponse = new KubideApiResponse(null, {
        success: false,
        error: error.message,
      });

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
