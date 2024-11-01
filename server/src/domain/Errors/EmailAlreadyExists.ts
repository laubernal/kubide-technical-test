import { DomainError } from './DomainError';

export class EmailAlreadyExistsError extends DomainError {
  constructor() {
    super('Email already exists');

    Object.setPrototypeOf(this, EmailAlreadyExistsError.prototype);
  }
}
