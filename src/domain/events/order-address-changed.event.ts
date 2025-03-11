import { UniqueEntityId } from '../identifer/unique-entity.id';
import { Address } from '../value-objects/address.vo';
import { DomainEventInterface } from './domain.event.interface';

export class OrderAddressChangedEvent implements DomainEventInterface {
  public readonly dateTimeOccurred: Date;

  constructor(
    public readonly orderId: UniqueEntityId,
    public readonly address: Address,
  ) {
    this.dateTimeOccurred = new Date();
  }
  getAggregateRootId(): UniqueEntityId {
    return this.orderId;
  }
}
