import { User } from '../../users/user.entity';
import { StatusOrder } from '../enum/StatusOrder.enum';
import { OrderItem } from './order-items.entity';
import { PaymentMethod } from '../enum/PaymentMethod.enum';
export default class Order {
    id: string;
    order_ID: string;
    fullName: string;
    phone: string;
    address: string;
    note: string;
    shippingCost: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    customer: User;
    total: number;
    statusOrder: StatusOrder;
    orderItems: OrderItem[];
    paidDate: Date;
    createdAt: Date;
    updatedAt: Date;
    generateReadableId(): void;
}
