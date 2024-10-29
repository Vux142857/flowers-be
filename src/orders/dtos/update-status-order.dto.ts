import { IsBoolean, IsEnum, IsISO8601, IsOptional } from 'class-validator';
import { StatusOrder } from '../enum/StatusOrder.enum';

export class UpdateOrderStatusDto {
  @IsOptional()
  @IsEnum(StatusOrder)
  statusOrder: StatusOrder;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsISO8601()
  paidDate: string;
}
