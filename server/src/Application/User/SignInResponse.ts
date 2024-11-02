import { User } from 'src/Domain/Entities/User';

export class SignInResponse {
  public static fromDomain(user: User): SignInResponse {
    return new SignInResponse(user.id(), user.name(), user.email());
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) {}
}
