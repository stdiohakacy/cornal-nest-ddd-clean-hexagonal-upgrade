import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import {
  ORDER_REPOSITORY,
  OrderRepositoryInterface,
} from 'src/domain/repositories/order.repository.interface';
import { OrderDTOMapper } from 'src/interface/mappers/order.dto.mapper';
import { CreateOrderCommand } from '../commands/create-order.command';
import { OrderCreatedEvent } from 'src/domain/events/order-created.event';
import {
  EVENT_PRODUCER,
  EventBusPortInterface,
} from '../ports/event-bus-port.interface';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryInterface,
    @Inject(EVENT_PRODUCER)
    private readonly eventBusProducer: EventBusPortInterface,
  ) {}

  async execute(command: CreateOrderCommand): Promise<UniqueEntityId> {
    const order = OrderDTOMapper.toDomain(command.dto);
    const event = new OrderCreatedEvent(order.id, order.customerId);
    await this.orderRepository.save(order);
    await this.eventBusProducer.emit('order-created', event);
    return order.id;
  }
}
