import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { CreateOrderUseCase } from '../use-cases/create-order.use-case';
import { UniqueEntityId } from 'src/domain/identifer/unique-entity.id';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async execute(command: CreateOrderCommand): Promise<UniqueEntityId> {
    return await this.createOrderUseCase.execute(command);
  }
}
