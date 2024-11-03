import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/Constants';
import { IMessageRepository } from 'src/Domain/Repositories/IMessageRepository';
import { GetMessagesDto } from './GetMessagesDto';
import { GetMessagesResponse } from './GetMessagesResponse';
import { Message } from 'src/Domain/Entities/Message';

@Injectable()
export class GetMessagesHandler {
  constructor(
    @Inject(MESSAGES_REPOSITORY)
    private readonly repository: IMessageRepository,
  ) {}

  public async execute(dto: GetMessagesDto): Promise<GetMessagesResponse[]> {
    const messages = await this.getMessages(dto.userId);

    const response = messages.map((message: Message) => {
      return GetMessagesResponse.fromDomain(message);
    });

    return response;
  }

  private async getMessages(userId: string): Promise<Message[]> {
    return this.repository.findByUserId(userId);
  }
}
