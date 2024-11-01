export abstract class DomainError extends Error {
  public readonly occurredOn: Date = new Date();

  protected constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }

  public serialize(): {
    errorType: string;
    occurredOn: Date;
    message: string;
  }[] {
    return [
      {
        errorType: this.constructor.name,
        occurredOn: this.occurredOn,
        message: this.message,
      },
    ];
  }
}
