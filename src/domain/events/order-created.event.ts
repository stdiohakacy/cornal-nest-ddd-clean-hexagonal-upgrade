import { UniqueEntityId } from '../identifer/unique-entity.id';
import { DomainEventInterface } from './domain.event.interface';

export class OrderCreatedEvent implements DomainEventInterface {
  public readonly dateTimeOccurred: Date;

  constructor(
    public readonly orderId: UniqueEntityId,
    public readonly customerId: string,
  ) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateRootId(): UniqueEntityId {
    return this.orderId;
  }

  toJSON(): Record<string, unknown> {
    return {
      orderId: this.orderId.toString(),
      customerId: this.customerId,
      dateTimeOccurred: this.dateTimeOccurred.toISOString(),
    };
  }
}
