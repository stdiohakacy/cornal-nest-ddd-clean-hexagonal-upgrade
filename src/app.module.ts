// src/app.module.ts
import { Module } from '@nestjs/common';
import { OrderController } from './interface/http/order.controller';
import { CreateOrderUseCase } from './application/use-cases/create-order.usecase';
import { OrderRepository } from './infrastructure/repositories/order.repository';

@Module({
  controllers: [OrderController],
  providers: [CreateOrderUseCase, OrderRepository],
})
export class AppModule {}
