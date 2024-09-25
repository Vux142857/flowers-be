import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { Product } from 'src/products/product.entity';
import { Payment } from 'src/payments/payment.entity';

class OrderItemDto {
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @Type(() => Number)
  subTotal: number;

  @IsNotEmpty()
  @Type(() => Product)
  product: Product;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @Type(() => Number)
  total: number;

  @IsNotEmpty()
  @IsEnum(StatusOrder)
  statusOrder?: StatusOrder = StatusOrder.PENDING;

  @IsNotEmpty()
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsOptional()
  @Type(() => Payment)
  payment?: Payment;
}
