import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/application/commands/create-order.command';
import { OrderDTO } from 'src/application/dtos/order.dto';
import { FindOrdersByCustomerQuery } from 'src/application/queries';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO): Promise<UniqueEntityId> {
    return this.commandBus.execute(new CreateOrderCommand(dto));
  }

  @Get('/customer/:customerId')
  async findOrders(
    @Param('customerId') customerId: string,
  ): Promise<OrderDTO[]> {
    return this.queryBus.execute(new FindOrdersByCustomerQuery(customerId));
  }
}
