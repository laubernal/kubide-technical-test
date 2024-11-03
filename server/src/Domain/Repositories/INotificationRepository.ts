import { Notification } from '../Entities/Notification';

export interface INotificationRepository {
  findByUserId(id: string): Promise<Notification[]>;

  save(entity: Notification): Promise<void>;
}
