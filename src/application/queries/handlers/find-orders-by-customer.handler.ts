import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOrdersByCustomerQuery } from '../find-orders-by-customer.query';
import { FindOrdersByCustomerUseCase } from 'src/application/use-cases/find-orders-by-customer.use-case';
import { OrderDTO } from 'src/application/dtos/order.dto';

@QueryHandler(FindOrdersByCustomerQuery)
export class FindOrdersByCustomerHandler
  implements IQueryHandler<FindOrdersByCustomerQuery>
{
  constructor(
    private readonly findOrdersByCustomerUseCase: FindOrdersByCustomerUseCase,
  ) {}

  async execute(query: FindOrdersByCustomerQuery): Promise<OrderDTO[]> {
    return this.findOrdersByCustomerUseCase.execute(query.customerId);
  }
}
