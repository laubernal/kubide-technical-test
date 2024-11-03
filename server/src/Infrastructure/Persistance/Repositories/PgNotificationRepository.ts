import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INotificationRepository } from 'src/Domain/Repositories/INotificationRepository';
import { NotificationModel } from '../Models/NotificationModel';
import { NotificationMapper } from '../Mappers/NotificationMapper';
import { Notification } from 'src/Domain/Entities/Notification';

@Injectable()
export class PgNotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(NotificationModel)
    private readonly notificationsRepository: Repository<NotificationModel>,
    private readonly mapper: NotificationMapper,
  ) {}

  public async findByUserId(id: string): Promise<Notification[]> {
    const models = await this.notificationsRepository.find({
      where: [{ receiver: id }],
      order: {
        createdAt: 'DESC',
      },
    });

    return models.map((model: NotificationModel) => {
      return this.mapper.toDomain(model);
    });
  }

  public async save(entity: Notification): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.notificationsRepository.save(model);
  }
}
