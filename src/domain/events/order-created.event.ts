import { UniqueEntityId } from '../identifer/unique-entity.id';
import { DomainEventInterface } from './domain.event.interface';

export class OrderCreatedEvent implements DomainEventInterface {
  public readonly dateTimeOccurred: Date;

  constructor(public readonly orderId: UniqueEntityId) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateRootId(): UniqueEntityId {
    return this.orderId;
  }
}
