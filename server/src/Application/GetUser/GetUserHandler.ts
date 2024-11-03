import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/Constants';
import { IUserRepository } from 'src/Domain/Repositories/IUserRepository';
import { GetUserDto } from './GetUserDto';
import { GetUserResponse } from './GetUserResponse';
import { User } from 'src/Domain/Entities/User';
import { RecordNotFoundError } from 'src/Domain/Errors/RecordNotFoundError';

@Injectable()
export class GetUserHandler {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly repository: IUserRepository,
  ) {}

  public async execute(dto: GetUserDto): Promise<GetUserResponse> {
    const user = await this.findUser(dto.id);

    return GetUserResponse.fromDomain(user);
  }

  private async findUser(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new RecordNotFoundError();
    }

    return user;
  }
}
