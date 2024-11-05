import Order from '../entities/order.entity';
import { HttpService } from '@nestjs/axios';
export declare class ZaloPaymentProvider {
    private httpService;
    constructor(httpService: HttpService);
    createZaloPayment(order: Order): Promise<any>;
}
