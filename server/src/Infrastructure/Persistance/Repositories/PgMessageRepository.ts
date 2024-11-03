import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMessageRepository } from 'src/Domain/Repositories/IMessageRepository';
import { MessageMapper } from '../Mappers/MessageMapper';
import { MessageModel } from '../Models/MessageModel';
import { Message } from 'src/Domain/Entities/Message';

@Injectable()
export class PgMessageRepository implements IMessageRepository {
  constructor(
    @InjectRepository(MessageModel)
    private readonly messagesRepository: Repository<MessageModel>,
    private readonly mapper: MessageMapper,
  ) {}

  public async findByUserId(id: string): Promise<Message[]> {
    const models = await this.messagesRepository.find({
      where: [{ sender: id }, { receiver: id }],
      order: {
        createdAt: 'DESC',
      },
    });

    return models.map((model: MessageModel) => {
      return this.mapper.toDomain(model);
    });
  }

  public async save(entity: Message): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.messagesRepository.save(model);
  }
}
