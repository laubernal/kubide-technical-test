import { Controller, Get, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/Infrastructure/Guard/AuthGuard';
import { MESSAGES_SWAGGER_TAG } from 'src/Constants';
import { GetMessagesHandler } from 'src/Application/GetMessages/GetMessagesHandler';
import { GetMessagesParams } from './GetMessagesParams';

@ApiBearerAuth()
@ApiTags(MESSAGES_SWAGGER_TAG)
@Controller()
export class GetMessagesController {
  constructor(private readonly getMessagesHandler: GetMessagesHandler) {}

  @UseGuards(AuthGuard)
  @Get('/api/messages/:userId')
  @ApiOperation({ summary: 'Get messages from a user' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden resource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Messages retrieved succesfully' })
  public async get(
    @Param() params: GetMessagesParams,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const messages = await this.getMessagesHandler.execute(params);

      const response = new KubideApiResponse(messages, {
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
