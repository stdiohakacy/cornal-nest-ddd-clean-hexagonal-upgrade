import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';
import { CreateOrderCommand } from '../create-order.command';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.use-case';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async execute(command: CreateOrderCommand): Promise<UniqueEntityId> {
    return await this.createOrderUseCase.execute(command);
  }
}
