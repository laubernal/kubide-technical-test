import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageModel {
  @PrimaryColumn({
    name: 'me_id',
    type: 'varchar',
  })
  id!: string;

  @Column({ name: 'me_sender_id' })
  sender: string;

  @Column({ name: 'me_receiver_id' })
  receiver: string;

  @Column({
    name: 'me_message',
    type: 'varchar',
  })
  message!: string;

  @Column({ name: 'me_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;
}
