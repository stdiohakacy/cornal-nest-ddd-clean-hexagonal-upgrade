import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventBusPortInterface } from 'src/application/ports/event-bus.port';
import { DomainEventInterface } from 'src/domain/events/domain.event.interface';

@Injectable()
export class KafkaProducerAdapter implements EventBusPortInterface {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async emit<T extends DomainEventInterface>(
    topic: string,
    event: T,
  ): Promise<void> {
    const message = event.toJSON();
    await this.kafkaClient.emit(topic, message).toPromise();
  }
}
