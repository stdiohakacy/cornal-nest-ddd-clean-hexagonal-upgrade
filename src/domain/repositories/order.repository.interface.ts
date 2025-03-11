import { OrderAggregate } from '../entities/order.entity';
import { UniqueEntityId } from '../identifer/unique-entity.id';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderRepositoryInterface {
  save(order: OrderAggregate): Promise<void>;
  findById(id: UniqueEntityId): Promise<OrderAggregate | null>;
  findAll(): Promise<OrderAggregate[]>;
  delete(orderId: UniqueEntityId): Promise<void>;
}
