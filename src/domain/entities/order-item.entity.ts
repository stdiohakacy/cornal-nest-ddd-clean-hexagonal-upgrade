import { UniqueEntityId } from '../identifer/unique-entity.id';
import { BaseEntity } from './base.entity';

interface OrderItemProps {
  productId: string;
  quantity: number;
  price: number;
}

export class OrderItem extends BaseEntity<OrderItemProps> {
  constructor(props: OrderItemProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get productId(): string {
    return this.props.productId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): number {
    return this.props.price;
  }

  public static create(props: OrderItemProps, id?: UniqueEntityId): OrderItem {
    if (props.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    return new OrderItem(props, id);
  }
}
