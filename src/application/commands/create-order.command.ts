import { ICommand } from '@nestjs/cqrs';
import { CreateOrderDTO } from 'src/interface/dtos/create-order.dto';

export class CreateOrderCommand implements ICommand {
  constructor(public readonly dto: CreateOrderDTO) {}
}
