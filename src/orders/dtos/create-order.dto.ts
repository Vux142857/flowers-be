import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { Product } from 'src/products/product.entity';
import { PaymentMethod } from '../enum/PaymentMethod.enum';

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
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsOptional()
  @IsInt()
  shippingCost?: number = 0;

  @IsNotEmpty()
  @IsInt()
  total: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod = PaymentMethod.COD;

  @IsNotEmpty()
  @IsEnum(StatusOrder)
  statusOrder?: StatusOrder = StatusOrder.PENDING;

  @ValidateNested()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
