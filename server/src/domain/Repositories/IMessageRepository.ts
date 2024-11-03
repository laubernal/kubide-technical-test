import { Message } from '../Entities/Message';

export interface IMessageRepository {
  findByUserId(id: string): Promise<Message[]>;

  save(entity: Message): Promise<void>;
}
