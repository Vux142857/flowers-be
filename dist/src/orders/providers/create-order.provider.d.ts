import Order from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { ProductService } from '../../products/providers/product.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { User } from '../../users/user.entity';
export declare class CreateOrderProvider {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly productService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productService: ProductService);
    createOrder(createOrderDto: CreateOrderDto, customer: User): Promise<Order>;
}
