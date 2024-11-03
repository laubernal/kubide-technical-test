import { Notification } from 'src/Domain/Entities/Notification';

export class GetNotificationsResponse {
  public static fromDomain(
    notification: Notification,
  ): GetNotificationsResponse {
    return new GetNotificationsResponse(
      notification.id(),
      notification.messageId(),
      notification.receiverId(),
      notification.createdAt(),
    );
  }

  constructor(
    readonly id: string,
    readonly messageId: string,
    readonly receiverId: string,
    readonly createdAt: Date,
  ) {}
}
