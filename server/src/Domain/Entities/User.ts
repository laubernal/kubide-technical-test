import { InvalidCredentialsError } from '../Errors/InvalidCredentialsError';
import { CryptoService } from '../Services/CryptoService';

export class User {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _isActive: boolean,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  public async checkIsAValidPassword(
    crypto: CryptoService,
    supplied: string,
  ): Promise<void> {
    const valid = await crypto.compare(this._password, supplied);

    if (!valid) {
      throw new InvalidCredentialsError();
    }
  }

  public id(): string {
    return this._id;
  }

  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email;
  }

  public password(): string {
    return this._password;
  }

  public isActive(): boolean {
    return this._isActive;
  }

  public createdAt(): Date {
    return this._createdAt;
  }

  public updatedAt(): Date {
    return this._updatedAt;
  }
}
