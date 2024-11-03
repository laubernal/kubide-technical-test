import { v4 as uuidv4 } from 'uuid';

export class UuidService {
  public generate(): string {
    return uuidv4();
  }
}
