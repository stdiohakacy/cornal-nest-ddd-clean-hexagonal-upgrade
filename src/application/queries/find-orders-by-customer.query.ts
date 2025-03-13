import { IQuery } from '@nestjs/cqrs';

export class FindOrdersByCustomerQuery implements IQuery {
  constructor(public readonly customerId: string) {}
}
