import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import {
  ORDER_REPOSITORY,
  OrderRepositoryInterface,
} from 'src/domain/repositories/order.repository.interface';
import { CreateOrderDTO } from '../interface/dtos/create-order.dto';
import { OrderDTOMapper } from 'src/interface/mappers/order.dto.mapper';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async createOrder(dto: CreateOrderDTO): Promise<UniqueEntityId> {
    const order = OrderDTOMapper.toDomain(dto);
    await this.orderRepository.save(order);
    return order.id;
  }

  async getOrderById(orderId: string): Promise<CreateOrderDTO | null> {
    const order = await this.orderRepository.findById(
      new UniqueEntityId(orderId),
    );
    return order ? OrderDTOMapper.toDTO(order) : null;
  }
}
