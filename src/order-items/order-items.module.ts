import { Module } from '@nestjs/common';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './providers/order-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-items.entity';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemsModule {}
