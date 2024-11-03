import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class NotificationModel {
  @PrimaryColumn({
    name: 'no_id',
    type: 'varchar',
  })
  id!: string;

  @Column({ name: 'no_messsage_id' })
  message: string;

  @Column({ name: 'no_receiver_id' })
  receiver: string;

  @Column({ name: 'no_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;
}
