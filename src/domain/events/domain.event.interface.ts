import { UniqueEntityId } from '../identifer/unique-entity.id';

export interface DomainEventInterface {
  dateTimeOccurred: Date;
  getAggregateRootId(): UniqueEntityId;
}
