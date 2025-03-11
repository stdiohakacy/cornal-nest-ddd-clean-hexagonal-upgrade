// src/interface/http/order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly orderRepository: OrderRepository,
  ) {}

  @Post()
  createOrder(
    @Body()
    body: {
      customerId: string;
      items: { productId: string; quantity: number; price: number }[];
    },
  ) {
    const order = this.createOrderUseCase.execute(body.customerId, body.items);
    return this.orderRepository.save(order);
  }
}
