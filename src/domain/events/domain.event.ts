import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityId } from '../identifer/unique-entity.id';
import { DomainEventInterface } from './domain.event.interface';

export class DomainEvent {
  private static handlersMap: Record<
    string,
    Array<(event: DomainEventInterface) => void>
  > = {};

  private static markedAggregates: Map<string, AggregateRoot<unknown>> =
    new Map();

  public static markAggregateForDispatch<T>(aggregate: AggregateRoot<T>): void {
    if (!this.markedAggregates.has(aggregate.id.toString())) {
      this.markedAggregates.set(
        aggregate.id.toString(),
        aggregate as AggregateRoot<unknown>,
      );
    }
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId): void {
    const aggregate = this.findMarkedAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = new Map<string, AggregateRoot<unknown>>();
  }

  public static register<T extends DomainEventInterface>(
    callback: (event: T) => void,
    eventClassName: string,
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(
      callback as (event: DomainEventInterface) => void,
    );
  }

  private static dispatchAggregateEvents<T>(aggregate: AggregateRoot<T>): void {
    aggregate.domainEvents.forEach((event: DomainEventInterface) =>
      this.dispatch(event),
    );
  }

  private static findMarkedAggregateById<T>(
    id: UniqueEntityId,
  ): AggregateRoot<T> | undefined {
    return this.markedAggregates.get(id.toString()) as
      | AggregateRoot<T>
      | undefined;
  }

  private static removeAggregateFromMarkedDispatchList<T>(
    aggregate: AggregateRoot<T>,
  ): void {
    this.markedAggregates.delete(aggregate.id.toString());
  }

  private static async dispatch(event: DomainEventInterface): Promise<void> {
    const eventClassName: string = event.constructor.name;

    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      console.warn(`No handlers registered for event: ${eventClassName}`);
    } else {
      const handlers = this.handlersMap[eventClassName] as Array<
        (event: DomainEventInterface) => void
      >;
      await Promise.all(handlers.map((handler) => handler(event)));
    }
  }
}
