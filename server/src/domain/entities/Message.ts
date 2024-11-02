export class Message {
  constructor(
    private readonly _id: string,
    private readonly _senderId: string,
    private readonly _receiverId: string,
    private readonly _message: string,
    private readonly _createdAt: Date,
  ) {}

  public id(): string {
    return this._id;
  }

  public senderId(): string {
    return this._senderId;
  }

  public receiverId(): string {
    return this._receiverId;
  }

  public message(): string {
    return this._message;
  }

  public createdAt(): Date {
    return this._createdAt;
  }
}
