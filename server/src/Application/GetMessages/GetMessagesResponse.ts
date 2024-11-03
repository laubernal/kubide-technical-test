import { Message } from 'src/Domain/Entities/Message';

export class GetMessagesResponse {
  public static fromDomain(message: Message): GetMessagesResponse {
    return new GetMessagesResponse(
      message.id(),
      message.senderId(),
      message.receiverId(),
      message.message(),
      message.createdAt(),
    );
  }

  constructor(
    readonly id: string,
    readonly senderId: string,
    readonly receiverId: string,
    readonly message: string,
    readonly createdAt: Date,
  ) {}
}
