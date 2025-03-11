import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];

  save(order: Order) {
    this.orders.push(order);
    return order;
  }

  findById(id: string) {
    return this.orders.find((order) => order.id === id);
  }
}
