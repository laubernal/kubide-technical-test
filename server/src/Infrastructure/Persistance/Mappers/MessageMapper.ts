import { Message } from 'src/Domain/Entities/Message';
import { MessageModel } from '../Models/MessageModel';

export class MessageMapper {
  public toModel(entity: Message): MessageModel {
    const model = new MessageModel();

    model.id = entity.id();
    model.sender = entity.senderId();
    model.receiver = entity.receiverId();
    model.message = entity.message();
    model.createdAt = entity.createdAt();

    return model;
  }

  public toDomain(model: MessageModel): Message {
    return new Message(
      model.id,
      model.sender,
      model.receiver,
      model.message,
      model.createdAt,
    );
  }
}
