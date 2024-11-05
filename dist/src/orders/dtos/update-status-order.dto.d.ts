import { StatusOrder } from '../enum/StatusOrder.enum';
export declare class UpdateOrderStatusDto {
    statusOrder: StatusOrder;
    isPaid: boolean;
    paidDate: string;
}
