import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { User } from 'src/Domain/Entities/User';
import { GetActiveUsersResponse } from './GetActiveUsersResponse';

@Injectable()
export class GetActiveUsersHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
  ) {}

  public async execute(): Promise<GetActiveUsersResponse[]> {
    const users = await this.getActiveUsers();

    const response = users.map((user: User) => {
      return GetActiveUsersResponse.fromDomain(user);
    });

    return response;
  }

  private async getActiveUsers(): Promise<User[]> {
    return await this.repository.findActiveUsers();
  }
}
