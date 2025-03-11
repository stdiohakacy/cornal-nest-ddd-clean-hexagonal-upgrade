import { OrderStatus } from '../value-objects/order-status';
import { OrderItem } from './order-item.entity';

export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public items: OrderItem[],
    public status: OrderStatus,
    public createdAt: Date,
  ) {}

  completeOrder() {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Order cannot be completed');
    }
    this.status = OrderStatus.COMPLETED;
  }

  cancelOrder() {
    if (this.status === OrderStatus.COMPLETED) {
      throw new Error('Completed order cannot be cancelled');
    }
    this.status = OrderStatus.CANCELLED;
  }
}
