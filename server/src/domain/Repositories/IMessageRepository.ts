import { Message } from '../Entities/Message';

export interface IMessageRepository {
  findByReceiverId(id: string): Promise<Message[]>;

  save(entity: Message): Promise<void>;
}
