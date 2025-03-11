// src/interface/http/order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from 'src/application/order.service';
import { OrderRepositoryInterface } from 'src/domain/repositories/order.repository.interface';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO): Promise<UniqueEntityId> {
    return await this.orderService.createOrder(dto);
  }
}
