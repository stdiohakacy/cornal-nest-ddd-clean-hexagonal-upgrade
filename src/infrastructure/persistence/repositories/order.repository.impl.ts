import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepositoryInterface } from 'src/domain/repositories/order.repository.interface';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { Repository } from 'typeorm';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderAggregate } from 'src/domain/entities/order.entity';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepositoryImpl implements OrderRepositoryInterface {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepository: Repository<OrderOrmEntity>,
  ) {}

  async save(order: OrderAggregate): Promise<void> {
    const orderOrm = OrderMapper.toOrmEntity(order);
    await this.orderRepository.save(orderOrm);
  }

  async findById(id: UniqueEntityId): Promise<OrderAggregate | null> {
    const orderOrm = await this.orderRepository.findOne({
      where: { id: id.toString() },
      relations: ['items'],
    });

    return orderOrm ? OrderMapper.toDomain(orderOrm) : null;
  }

  async findAll(): Promise<OrderAggregate[]> {
    const orderOrms = await this.orderRepository.find({ relations: ['items'] });
    return orderOrms.map((order) => OrderMapper.toDomain(order));
  }

  async delete(orderId: UniqueEntityId): Promise<void> {
    await this.orderRepository.delete(orderId.toString());
  }
}
