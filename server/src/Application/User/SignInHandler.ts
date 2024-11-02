import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { User } from 'src/Domain/Entities/User';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { SignInResponse } from './SignInResponse';
import { SignInDto } from './SignInDto';

Injectable();
export class SignInHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
  ) {}

  public async execute(dto: SignInDto): Promise<SignInResponse> {
    const user = await this.findUser(dto.email);

    await user.checkIsAValidPassword(dto.password);

    return SignInResponse.fromDomain(user);
  }

  private async findUser(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new RecordNotFoundError();
    }

    return user;
  }
}
