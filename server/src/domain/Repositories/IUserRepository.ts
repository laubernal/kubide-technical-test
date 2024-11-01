import { User } from '../Entities/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;

  findById(): Promise<User | undefined>;

  findActiveUsers(): Promise<User[]>;

  save(entity: User): Promise<void>;

  update(entity: User): Promise<void>;
}
