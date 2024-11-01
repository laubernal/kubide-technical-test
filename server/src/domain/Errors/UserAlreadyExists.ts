import { DomainError } from './DomainError';

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('User already exists');

    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}
