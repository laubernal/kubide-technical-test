export class Notification {
  constructor(
    private readonly _id: string,
    private readonly _messageId: string,
    private readonly _receiverId: string,
    private readonly _createdAt: Date,
  ) {}

  public id(): string {
    return this._id;
  }

  public messageId(): string {
    return this._messageId;
  }

  public receiverId(): string {
    return this._receiverId;
  }

  public createdAt(): Date {
    return this._createdAt;
  }
}
