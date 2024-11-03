import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SaveMessageHandler } from 'src/Application/SaveMessage/SaveMessageHandler';
import { MESSAGES_SWAGGER_TAG } from 'src/Constants';
import { SaveMessageRequest } from './SaveMessageRequest';
import { Response } from 'express';
import { KubideApiResponse } from 'src/KubideApiResponse';
import { UnableToSendMessageToInactiveUserError } from 'src/Domain/Errors/UnableToSendMessageToInactiveUserError';

@ApiBearerAuth()
@ApiTags(MESSAGES_SWAGGER_TAG)
@Controller()
export class SaveMessageController {
  constructor(private readonly saveMessageHandler: SaveMessageHandler) {}

  @Post('/api/messages')
  @ApiOperation({ summary: 'Save a message' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Unable to send message to inactive user',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Message saved succesfully' })
  public async post(
    @Body() body: SaveMessageRequest,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      await this.saveMessageHandler.execute(body);

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

      if (error instanceof UnableToSendMessageToInactiveUserError) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
}
