import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => OrderItemOrmEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItemOrmEntity[];
}
