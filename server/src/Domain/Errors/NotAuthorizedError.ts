import { DomainError } from './DomainError';

export class NotAuthorizedError extends DomainError {
  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
