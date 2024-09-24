import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import { PaymentType } from '../enum/PaymentType';
import Order from 'src/orders/entities/order.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  @Type(() => User)
  user: User;

  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @IsNotEmpty()
  @Type(() => Order)
  order: Order;
}
