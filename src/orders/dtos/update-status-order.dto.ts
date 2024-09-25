import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusOrder } from '../enum/StatusOrder.enum';

export class UpdateStatusOrderDto {
  @IsNotEmpty()
  @IsEnum(StatusOrder)
  statusOrder: StatusOrder;
}
