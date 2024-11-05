import { StatusOrder } from '../enum/StatusOrder.enum';
import { Product } from '../../products/product.entity';
import { PaymentMethod } from '../enum/PaymentMethod.enum';
declare class OrderItemDto {
    quantity: number;
    subTotal?: number;
    product: Product;
}
export declare class CreateOrderDto {
    fullName: string;
    phone: string;
    address: string;
    note?: string;
    shippingCost?: number;
    total: number;
    paymentMethod?: PaymentMethod;
    statusOrder?: StatusOrder;
    orderItems: OrderItemDto[];
}
export {};
