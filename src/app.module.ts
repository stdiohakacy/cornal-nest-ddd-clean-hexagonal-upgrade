import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/domain/repositories/order.repository.interface';
import { OrderController } from './interface/controllers/order.controller';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { OrderRepositoryImpl } from './infrastructure/persistence/repositories/order.repository.impl';
import { OrderOrmEntity } from './infrastructure/persistence/entities/order.orm-entity';
import { OrderItemOrmEntity } from './infrastructure/persistence/entities/order-item.orm-entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerAdapter } from './infrastructure/adapters/messaging/kafka/kafka-producer.adapter';
import { EVENT_PRODUCER } from './application/ports/event-bus-port.interface';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { OrderQueryRepositoryImpl } from './infrastructure/persistence/repositories/order-query.repository';
import { ORDER_QUERY_PORT } from './application/ports/order-query-port.interface';
import { OrderUseCases } from './application/use-cases';

const imports = [
  CqrsModule,
  DatabaseModule,
  TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]),
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'order-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'order-group',
        },
      },
    },
  ]),
];

const providers = [
  ...CommandHandlers,
  ...QueryHandlers,
  ...OrderUseCases,
  {
    provide: ORDER_REPOSITORY,
    useClass: OrderRepositoryImpl,
  },
  {
    provide: EVENT_PRODUCER,
    useClass: KafkaProducerAdapter,
  },
  {
    provide: ORDER_QUERY_PORT,
    useClass: OrderQueryRepositoryImpl,
  },
];

@Module({
  imports,
  controllers: [OrderController],
  providers,
})
export class AppModule {}
