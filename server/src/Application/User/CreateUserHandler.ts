import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { User } from 'src/Domain/Entities/User';
import { UserAlreadyExistsError } from 'src/Domain/Errors/UserAlreadyExists';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { CryptoService } from 'src/Domain/Services/CryptoService';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
    private readonly crypto: CryptoService,
  ) {}

  public async execute(body: any): Promise<void> {
    await this.ensureEmailIsNotUsed(body.email);
    const hashedPassword = await this.crypto.hash(body.password);

    const newUser = User.build(
      body.id,
      body.name,
      body.email,
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
