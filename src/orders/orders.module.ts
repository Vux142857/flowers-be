import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';
import { OrderService } from './providers/order.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductsModule],
  providers: [OrderService],
})
export class OrdersModule {}
