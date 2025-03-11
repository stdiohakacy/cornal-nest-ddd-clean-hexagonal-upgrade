import { Identifier } from './Identifier';
import { v4 as uuid } from 'uuid';

export class UniqueEntityId extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : uuid());
  }
}
