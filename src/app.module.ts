import { ORDER_REPOSITORY } from 'src/domain/repositories/order.repository.interface';
import { Module } from '@nestjs/common';
import { OrderController } from './interface/controllers/order.controller';
import { OrderService } from './application/order.service';
import { DatabaseModule } from './infrastructure/persistence/database.module';
import { OrderRepositoryImpl } from './infrastructure/persistence/repositories/order.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './infrastructure/persistence/entities/order.orm-entity';
import { OrderItemOrmEntity } from './infrastructure/persistence/entities/order-item.orm-entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
  ],
})
export class AppModule {}
