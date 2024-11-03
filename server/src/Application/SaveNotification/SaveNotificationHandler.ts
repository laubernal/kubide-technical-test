import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_REPOSITORY } from 'src/Constants';
import { INotificationRepository } from 'src/Domain/Repositories/INotificationRepository';
import { SaveNotificationDto } from './SaveNotificationDto';
import { Notification } from 'src/Domain/Entities/Notification';

@Injectable()
export class SaveNotificationHandler {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly repository: INotificationRepository,
  ) {}

  public async execute(dto: SaveNotificationDto): Promise<void> {
    const notification = new Notification(
      dto.id,
      dto.messageId,
      dto.receiverId,
      new Date(),
    );

    await this.repository.save(notification);
  }
}
