import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryColumn({
    name: 'us_id',
    type: 'varchar',
  })
  id!: string;

  @Column({
    name: 'us_name',
    type: 'varchar',
  })
  name!: string;

  @Column({
    name: 'us_email',
    type: 'varchar',
  })
  email!: string;

  @Column({
    name: 'us_password',
    type: 'varchar',
  })
  password!: string;

  @Column({ name: 'us_is_active' })
  isActive!: boolean;

  @Column({ name: 'us_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'us_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}