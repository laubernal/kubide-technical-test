import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_REPOSITORY } from 'src/Constants';
import { INotificationRepository } from 'src/Domain/Repositories/INotificationRepository';
import { GetNotificationsDto } from './GetNotificationsDto';
import { Notification } from 'src/Domain/Entities/Notification';
import { GetNotificationsResponse } from './GetNotificationsResponse';

@Injectable()
export class GetNotificationsHandler {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly repository: INotificationRepository,
  ) {}

  public async execute(
    dto: GetNotificationsDto,
  ): Promise<GetNotificationsResponse[]> {
    const notifications = await this.getNotifications(dto.userId);

    return notifications.map((notification: Notification) => {
      return GetNotificationsResponse.fromDomain(notification);
    });
  }

  private async getNotifications(userId: string): Promise<Notification[]> {
    return await this.repository.findByUserId(userId);
  }
}
