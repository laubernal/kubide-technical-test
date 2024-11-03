import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from 'src/Constants';
import { IMessageRepository } from 'src/Domain/Repositories/IMessageRepository';
import { SaveMessageDto } from './SaveMessageDto';
import { GetUserResponse } from '../GetUser/GetUserResponse';
import { GetUserHandler } from '../GetUser/GetUserHandler';
import { UnableToSendMessageToInactiveUserError } from 'src/Domain/Errors/UnableToSendMessageToInactiveUserError';
import { Message } from 'src/Domain/Entities/Message';

@Injectable()
export class SaveMessageHandler {
  constructor(
    @Inject(MESSAGES_REPOSITORY)
    private readonly repository: IMessageRepository,
    private readonly getUserHandler: GetUserHandler,
  ) {}

  public async execute(dto: SaveMessageDto): Promise<void> {
    const [_, receiver] = await Promise.all([
      await this.getUser(dto.senderId),
      await this.getUser(dto.receiverId),
    ]);

    this.checkIfReceiverIsActive(receiver);

    const message = new Message(
      dto.id,
      dto.senderId,
      dto.receiverId,
      dto.message,
      new Date(),
    );

    await this.repository.save(message);
  }

  private async getUser(id: string): Promise<GetUserResponse> {
    const user = await this.getUserHandler.execute({ id });

    return user;
  }

  private checkIfReceiverIsActive(user: GetUserResponse): void {
    if (!user.isActive) {
      throw new UnableToSendMessageToInactiveUserError();
    }
  }
}