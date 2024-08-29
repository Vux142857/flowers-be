import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './order.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
