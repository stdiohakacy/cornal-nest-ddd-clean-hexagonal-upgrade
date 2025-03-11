import { DomainEvent } from '../events/domain.event';
import { DomainEventInterface } from '../events/domain.event.interface';
import { UniqueEntityId } from '../identifer/unique-entity.id';
import { BaseEntity } from './base.entity';

export abstract class AggregateRoot<T> extends BaseEntity<T> {
  private _domainEvents: DomainEventInterface[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): DomainEventInterface[] {
    return this._domainEvents;
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected addDomainEvent(domainEvent: DomainEventInterface): void {
    const eventExisted = this._domainEvents.some(
      (event) => event.constructor.name === domainEvent.constructor.name,
    );

    if (!eventExisted) {
      this._domainEvents.push(domainEvent);
      DomainEvent.markAggregateForDispatch(this);
      this.logDomainEventAdded(domainEvent);
    }
  }

  private logDomainEventAdded(domainEvent: DomainEventInterface): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
