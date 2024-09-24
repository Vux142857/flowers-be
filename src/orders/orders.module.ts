import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
})
export class OrdersModule {}
