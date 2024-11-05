import { OrderItem } from '../entities/order-items.entity';
import { Repository } from 'typeorm';
export declare class OrderItemsService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    createOrderItem(): Promise<string>;
    getOrderItems(): Promise<string>;
    getOrderItem(): Promise<string>;
    deleteOrderItem(): Promise<string>;
}
