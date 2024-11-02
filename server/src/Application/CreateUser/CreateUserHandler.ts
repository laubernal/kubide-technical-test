import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { User } from 'src/Domain/Entities/User';
import { UserAlreadyExistsError } from 'src/Domain/Errors/UserAlreadyExists';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { CryptoService } from 'src/Domain/Services/CryptoService';
import { CreateUserDto } from './CreateUserDto';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
    private readonly crypto: CryptoService,
  ) {}

  public async execute(dto: CreateUserDto): Promise<void> {
    await this.ensureEmailIsNotUsed(dto.email);
    const hashedPassword = await this.crypto.hash(dto.password);

    const newUser = User.build(
      dto.id,
      dto.name,
      dto.email,
      hashedPassword,
      true,
      new Date(),
      new Date(),
    );

    await this.repository.save(newUser);
  }

  private async ensureEmailIsNotUsed(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExistsError();
    }
  }
}