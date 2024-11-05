import { GetOrderDto } from './dtos/get-order.dto';
import { GetByParamDto } from '../common/get-by-param';
import { OrderService } from './providers/order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PatchOrderDto } from './dtos/patch-order.dto';
import { RequireParamDto } from '../common/require-param';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';
import { StatusOrder } from './enum/StatusOrder.enum';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(getOrderParamDto: GetByParamDto, getOrderDto: GetOrderDto): Promise<import("./entities/order.entity").default> | Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./entities/order.entity").default>>;
    createOrder(createOrderDto: CreateOrderDto, req: Request): Promise<import("./entities/order.entity").default>;
    createZaloPayOrder(createOrderDto: CreateOrderDto, req: Request): Promise<any>;
    zaloPayCallback(req: Request): Promise<any>;
}
export declare class AdminOrdersController {
    private readonly orderService;
    constructor(orderService: OrderService);
    searchOrders(searchQueryDto: SearchQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./entities/order.entity").default>>;
    filterOrders(filterOrderDto: GetOrderDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./entities/order.entity").default>>;
    countOrders(filterOrderDto: GetOrderDto): Promise<number>;
    getOrders(getOrderParamDto: GetByParamDto, getOrderDto: GetOrderDto): Promise<import("./entities/order.entity").default> | Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./entities/order.entity").default>>;
    updateOrder(patchOrderParamDto: RequireParamDto, patchOrderDto: PatchOrderDto): Promise<{
        fullName: string;
        phone: string;
        address: string;
        note: string;
        shippingCost: number;
        total: number;
        paymentMethod: import("./enum/PaymentMethod.enum").PaymentMethod;
        statusOrder: StatusOrder;
        orderItems: {
            quantity: number;
            subTotal?: number;
            product: import("../products/product.entity").Product;
        }[];
        id: string;
        order_ID: string;
        isPaid: boolean;
        customer: import("../users/user.entity").User;
        paidDate: Date;
        createdAt: Date;
        updatedAt: Date;
    } & import("./entities/order.entity").default>;
    deleteOrder(getOrderParamDto: GetByParamDto): Promise<import("./entities/order.entity").default>;
}
