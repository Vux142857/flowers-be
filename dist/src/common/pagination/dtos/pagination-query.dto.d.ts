import { StatusType } from '../../../common/statusType.enum';
import { StatusOrder } from '../../../orders/enum/StatusOrder.enum';
export declare class PaginationQueryDto {
    limit?: number;
    page?: number;
    status?: StatusType;
    statusOrder?: StatusOrder;
}
