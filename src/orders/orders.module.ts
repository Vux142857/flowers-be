import { Module } from '@nestjs/common';
import { AdminOrdersController, OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';
import { OrderService } from './providers/order.service';
import { ProductsModule } from 'src/products/products.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateOrderProvider } from './providers/create-order.provider';
import { OrderItemsService } from './providers/order-items.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';
import { SearchModule } from 'src/common/search/search.module';
import { FilterModule } from 'src/common/filter/filter.module';
import { HttpModule } from '@nestjs/axios';
import { ZaloPaymentProvider } from './providers/zalo-payment.provider';

@Module({
  controllers: [OrdersController, AdminOrdersController],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, User]),
    ProductsModule,
    PaginationModule,
    UsersModule,
    SearchModule,
    FilterModule,
    HttpModule,
  ],
  providers: [
    OrderService,
    CreateOrderProvider,
    OrderItemsService,
    ZaloPaymentProvider,
  ],
})
export class OrdersModule {}
