import { DomainError } from "./DomainError";

export class RecordNotFoundError extends DomainError {

  constructor() {
    super('Record not found');

    Object.setPrototypeOf(this, RecordNotFoundError.prototype);
  }
}