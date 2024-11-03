import { Notification } from 'src/Domain/Entities/Notification';
import { NotificationModel } from '../Models/NotificationModel';

export class NotificationMapper {
  public toModel(entity: Notification): NotificationModel {
    const model = new NotificationModel();

    model.id = entity.id();
    model.message = entity.messageId();
    model.receiver = entity.receiverId();
    model.createdAt = entity.createdAt();

    return model;
  }

  public toDomain(model: NotificationModel): Notification {
    return new Notification(
      model.id,
      model.message,
      model.receiver,
      model.createdAt,
    );
  }
}
