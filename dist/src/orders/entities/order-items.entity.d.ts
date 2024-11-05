import { Product } from '../../products/product.entity';
import Order from './order.entity';
export declare class OrderItem {
    id: string;
    quantity: number;
    subTotal: number;
    order: Order;
    product: Product;
}
