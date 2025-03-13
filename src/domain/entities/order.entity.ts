import { OrderAddressChangedEvent } from '../events/order-address-changed.event';
import { OrderCreatedEvent } from '../events/order-created.event';
import { UniqueEntityId } from '../identifer/unique-entity.id';
import { Address } from '../value-objects/address.vo';
import { AggregateRoot } from './aggregate-root';
import { OrderItem } from './order-item.entity';

interface OrderProps {
  customerId: string;
  address: Address;
  items: OrderItem[];
}

export class OrderAggregate extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get address(): Address {
    return this.props.address;
  }

  public static create(props: OrderProps, id?: UniqueEntityId): OrderAggregate {
    // if (props.items.getItems().length === 0) {
    //   throw new Error('Order must have at least one item');
    // }

    const order = new OrderAggregate(props, id);
    order.addDomainEvent(new OrderCreatedEvent(order.id, props.customerId));
    return order;
  }

  public changeAddress(address: Address): void {
    this.props.address = address;
    this.addDomainEvent(new OrderAddressChangedEvent(this.id, address));
  }
}
