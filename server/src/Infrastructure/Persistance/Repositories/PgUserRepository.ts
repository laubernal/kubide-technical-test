import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Domain/Entities/User';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { UserModel } from '../Models/UserModel';
import { Repository } from 'typeorm';
import { UserMapper } from '../Mappers/UserMapper';

@Injectable()
export class PgUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
    private readonly mapper: UserMapper,
  ) {}

  public async findByEmail(email: string): Promise<User | undefined> {
    const model = await this.usersRepository.findOneBy({ email });

    if (!model) {
      return undefined;
    }

    return this.mapper.toDomain(model);
  }

  public async findById(id: string): Promise<User | undefined> {
    const model = await this.usersRepository.findOneBy({ id });

    if (!model) {
      return undefined;
    }

    return this.mapper.toDomain(model);
  }

  public async findActiveUsers(): Promise<User[]> {
    const models = await this.usersRepository.findBy({ is_active: true });

    return models.map((model: UserModel) => {
      return this.mapper.toDomain(model);
    });
  }

  public async save(entity: User): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.usersRepository.save(model);
  }

  public async update(entity: User): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.usersRepository.update({ id: entity.id() }, model);
  }
}
