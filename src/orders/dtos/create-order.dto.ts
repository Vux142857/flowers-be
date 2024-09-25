import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { Product } from 'src/products/product.entity';
import { Payment } from 'src/payments/payment.entity';

class OrderItemDto {
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @Type(() => Number)
  subTotal?: number = 0;

  @IsNotEmpty()
  @Type(() => Product)
  product: Product;
}

export class CreateOrderDto {
  @IsOptional()
  @Type(() => Number)
  total?: number = 0;

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
