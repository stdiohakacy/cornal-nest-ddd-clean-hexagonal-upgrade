import { UniqueEntityId } from '../identifer/unique-entity.id';

export interface DomainEventInterface {
  dateTimeOccurred: Date;
  eventName: string;
  getAggregateRootId(): UniqueEntityId;
}
