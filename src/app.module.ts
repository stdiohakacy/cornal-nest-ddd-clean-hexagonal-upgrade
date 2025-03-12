import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/domain/repositories/order.repository.interface';

import { OrderController } from './interface/controllers/order.controller';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { OrderRepositoryImpl } from './infrastructure/persistence/repositories/order.repository.impl';
import { OrderOrmEntity } from './infrastructure/persistence/entities/order.orm-entity';
import { OrderItemOrmEntity } from './infrastructure/persistence/entities/order-item.orm-entity';
import { CreateOrderHandler } from './application/handlers/create-order.handler';
import { CommandHandlers } from './application/handlers';

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]),
  ],
  controllers: [OrderController],
  providers: [
    ...CommandHandlers,
    CreateOrderUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class AppModule {}
