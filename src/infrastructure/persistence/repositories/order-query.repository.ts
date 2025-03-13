import { Injectable } from '@nestjs/common';
import { OrderDTO } from 'src/application/dtos/order.dto';
import { OrderQueryPortInterface } from 'src/application/ports/order-query-port.interface';
import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderQueryRepositoryImpl implements OrderQueryPortInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepository: Repository<OrderOrmEntity>,
  ) {}

  async findOrdersByCustomer(customerId: string): Promise<OrderDTO[]> {
    const orders = await this.orderRepository.find({
      where: { customerId },
      select: ['id', 'customerId'],
    });

    return orders.map((order) => ({
      id: order.id,
      customerId: order.customerId,
    }));
  }
}
