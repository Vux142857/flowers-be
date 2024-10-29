import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod, StatusOrder } from '../enum/StatusOrder.enum';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

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
  fullName: string;

  @IsInt()
  phone: number;

  @IsString()
  address: string;

  @IsString()
  note: string;

  @IsOptional()
  @IsInt()
  shippingCost: number;

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
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @ValidateNested()
  @Type(() => User)
  customer: User;
}
