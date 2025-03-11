import { OrderItem } from 'src/domain/entities/order-item.entity';
import { Order } from 'src/domain/entities/order.entity';
import { OrderStatus } from 'src/domain/value-objects/order-status';

export class CreateOrderUseCase {
  execute(
    customerId: string,
    items: { productId: string; quantity: number; price: number }[],
  ) {
    const order = new Order(
      Math.random().toString(36).substr(2, 9),
      customerId,
      items.map(
        (item) => new OrderItem(item.productId, item.quantity, item.price),
      ),
      OrderStatus.PENDING,
      new Date(),
    );
    return order;
  }
}
