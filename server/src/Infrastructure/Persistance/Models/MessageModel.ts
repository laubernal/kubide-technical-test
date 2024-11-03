import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserModel } from './UserModel';

@Entity({ name: 'messages' })
export class MessageModel {
  @PrimaryColumn({
    name: 'me_id',
    type: 'varchar',
  })
  id!: string;

  @ManyToOne(() => UserModel, (user) => user.sent_messages)
  @JoinColumn({ name: 'me_sender_id' })
  sender: string;

  @ManyToOne(() => UserModel, (user) => user.received_messages)
  @JoinColumn({ name: 'me_receiver_id' })
  receiver: string;

  @Column({
    name: 'me_message',
    type: 'varchar',
  })
  message!: string;

  @Column({ name: 'me_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;
}
