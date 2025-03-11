import { OrderAggregate } from 'src/domain/entities/order.entity';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { Address } from 'src/domain/value-objects/address.vo';
import { OrderItem } from 'src/domain/entities/order-item.entity';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';

export class OrderDTOMapper {
  static toDomain(dto: CreateOrderDTO): OrderAggregate {
    return OrderAggregate.create({
      customerId: dto.customerId,
      address: Address.create({
        street: dto.address.street,
        city: dto.address.city,
        country: dto.address.country,
      }),
      items: dto.items.map((item) =>
        OrderItem.create(
          {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
          new UniqueEntityId(),
        ),
      ),
    });
  }
  static toDTO(order: OrderAggregate): CreateOrderDTO {
    return {
      customerId: order.customerId,
      address: {
        street: order.address.props.street,
        city: order.address.props.city,
        country: order.address.props.country,
      },
      items: order.props.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
