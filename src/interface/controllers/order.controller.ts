// src/interface/http/order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/application/commands/create-order.command';

@Controller('orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO): Promise<UniqueEntityId> {
    return this.commandBus.execute(new CreateOrderCommand(dto));
  }
}
