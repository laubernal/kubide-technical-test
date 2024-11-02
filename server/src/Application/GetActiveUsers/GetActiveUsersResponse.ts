import { User } from 'src/Domain/Entities/User';

export class GetActiveUsersResponse {
  public static fromDomain(user: User): GetActiveUsersResponse {
    return new GetActiveUsersResponse(
      user.id(),
      user.name(),
      user.email(),
      user.isActive(),
      user.createdAt(),
      user.updatedAt(),
    );
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly isActive: boolean,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
