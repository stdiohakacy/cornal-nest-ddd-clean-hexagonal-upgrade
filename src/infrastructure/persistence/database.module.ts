import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './typeorm.config';
import { OrderOrmEntity } from './entities/order.orm-entity';
import { OrderItemOrmEntity } from './entities/order-item.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig, autoLoadEntities: true }),
    TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]),
  ],
})
export class DatabaseModule {}
