import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { User } from 'src/Domain/Entities/User';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { CryptoService } from 'src/Domain/Services/CryptoService';
import { UpdateUserDto } from './UpdateUserDto';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';

@Injectable()
export class UpdateUserHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
    private readonly crypto: CryptoService,
  ) {}

  public async execute(dto: UpdateUserDto): Promise<void> {
    const user = await this.getUser(dto.id);
    const name = dto.name ? dto.name : user.name();
    const hashedPassword = dto.password
      ? await this.crypto.hash(dto.password)
      : user.password();

    const updatedUser = new User(
      user.id(),
      name,
      user.email(),
      hashedPassword,
      dto.isActive,
      user.updatedAt(),
      new Date(),
    );

    await this.repository.update(updatedUser);
  }

  private async getUser(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new RecordNotFoundError();
    }

    return user;
  }
}
