import { OrderAggregate } from 'src/domain/entities/order.entity';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { Address } from 'src/domain/value-objects/address.vo';
import { OrderItem } from 'src/domain/entities/order-item.entity';
import { OrderItemOrmEntity } from '../entities/order-item.orm-entity';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';

export class OrderMapper {
  static toDomain(orderOrm: OrderOrmEntity): OrderAggregate {
    return OrderAggregate.create(
      {
        customerId: orderOrm.customerId,
        address: Address.create({
          street: orderOrm.street,
          city: orderOrm.city,
          country: orderOrm.country,
        }),
        items: orderOrm.items.map((item) =>
          OrderItem.create(
            {
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
            new UniqueEntityId(item.id),
          ),
        ),
      },
      new UniqueEntityId(orderOrm.id),
    );
  }

  static toOrmEntity(order: OrderAggregate): OrderOrmEntity {
    const orderOrm = new OrderOrmEntity();

    orderOrm.id = order.id.toString();
    orderOrm.customerId = order.customerId;
    orderOrm.street = order.address.props.street;
    orderOrm.city = order.address.props.city;
    orderOrm.country = order.address.props.country;

    orderOrm.items = order.props.items.map((item: OrderItem) => {
      const orderItemOrm = new OrderItemOrmEntity();
      orderItemOrm.id = item.id.toString();
      orderItemOrm.productId = item.productId;
      orderItemOrm.quantity = item.quantity;
      orderItemOrm.price = item.price;
      return orderItemOrm;
    });

    return orderOrm;
  }
}
