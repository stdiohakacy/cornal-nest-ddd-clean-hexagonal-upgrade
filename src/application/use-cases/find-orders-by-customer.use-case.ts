import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_QUERY_PORT,
  OrderQueryPortInterface,
} from '../ports/order-query-port.interface';
import { OrderDTO } from '../dtos/order.dto';

@Injectable()
export class FindOrdersByCustomerUseCase {
  constructor(
    @Inject(ORDER_QUERY_PORT)
    private readonly orderQuery: OrderQueryPortInterface,
  ) {}

  async execute(customerId: string): Promise<OrderDTO[]> {
    return this.orderQuery.findOrdersByCustomer(customerId);
  }
}
