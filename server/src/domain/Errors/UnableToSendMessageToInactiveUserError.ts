import { DomainError } from './DomainError';

export class UnableToSendMessageToInactiveUserError extends DomainError {
  constructor() {
    super('Unable to send message to inactive user');

    Object.setPrototypeOf(
      this,
      UnableToSendMessageToInactiveUserError.prototype,
    );
  }
}
