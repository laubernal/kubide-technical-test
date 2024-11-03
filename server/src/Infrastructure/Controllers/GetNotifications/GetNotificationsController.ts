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
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { NOTIFICATIONS_SWAGGER_TAG } from 'src/Constants';
import { GetNotificationsParams } from './GetNotificationsParams';
import { GetNotificationsHandler } from 'src/Application/GetNotifications/GetNotificationsHandler';

@ApiBearerAuth()
@ApiTags(NOTIFICATIONS_SWAGGER_TAG)
@Controller()
export class GetNotificationsController {
  constructor(
    private readonly getNotificationsHandler: GetNotificationsHandler,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/api/notifications/:userId')
  @ApiOperation({ summary: 'Get notifications from a user' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notifications retrieved succesfully',
  })
  public async get(
    @Param() params: GetNotificationsParams,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const notifications = await this.getNotificationsHandler.execute(params);

      const response = new KubideApiResponse(notifications, {
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
