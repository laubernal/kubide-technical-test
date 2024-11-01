export class User {
  public static build(
    id: string,
    name: string,
    email: string,
    password: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): User {
    return new User(id, name, email, password, isActive, createdAt, updatedAt);
  }

  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _isActive: boolean,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

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
