import { DomainEventInterface } from 'src/domain/events/domain.event.interface';

export const EVENT_PRODUCER = Symbol('EVENT_PRODUCER');

export interface EventBusPortInterface {
  emit<T extends DomainEventInterface>(topic: string, event: T): Promise<void>;
}
