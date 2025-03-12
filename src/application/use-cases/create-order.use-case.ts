import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import {
  ORDER_REPOSITORY,
  OrderRepositoryInterface,
} from 'src/domain/repositories/order.repository.interface';
import { OrderDTOMapper } from 'src/interface/mappers/order.dto.mapper';
import { CreateOrderCommand } from '../commands/create-order.command';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async execute(command: CreateOrderCommand): Promise<UniqueEntityId> {
    const order = OrderDTOMapper.toDomain(command.dto);
    await this.orderRepository.save(order);
    return order.id;
  }

  // async createOrder(dto: CreateOrderDTO): Promise<UniqueEntityId> {
  //   const order = OrderDTOMapper.toDomain(dto);
  //   await this.orderRepository.save(order);
  //   return order.id;
  // }

  // async getOrderById(orderId: string): Promise<CreateOrderDTO | null> {
  //   const order = await this.orderRepository.findById(
  //     new UniqueEntityId(orderId),
  //   );
  //   return order ? OrderDTOMapper.toDTO(order) : null;
  // }
}
