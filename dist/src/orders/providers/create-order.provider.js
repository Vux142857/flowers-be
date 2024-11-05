"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderProvider = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../entities/order.entity");
const typeorm_2 = require("typeorm");
const order_items_entity_1 = require("../entities/order-items.entity");
const product_service_1 = require("../../products/providers/product.service");
const common_1 = require("@nestjs/common");
const StatusOrder_enum_1 = require("../enum/StatusOrder.enum");
let CreateOrderProvider = class CreateOrderProvider {
    constructor(orderRepository, orderItemRepository, productService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productService = productService;
    }
    async createOrder(createOrderDto, customer) {
        const queryRunner = this.orderRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const { orderItems } = createOrderDto;
            let total = 0;
            const order = this.orderRepository.create({
                customer,
                total,
                statusOrder: createOrderDto.statusOrder,
                ...createOrderDto,
            });
            if (!order.isPaid && order.statusOrder === StatusOrder_enum_1.StatusOrder.DONE) {
                throw new common_1.ConflictException('Order must be paid before done');
            }
            const savedOrder = await queryRunner.manager.save(order_entity_1.default, order);
            const processedOrderItems = [];
            for (const itemDto of orderItems) {
                const product = await this.productService.getProductById(itemDto.product.id);
                if (!product) {
                    throw new common_1.NotFoundException(`Product with ID ${itemDto.product.id} not found`);
                }
                const isAvailable = await this.productService.checkStock(product.id, itemDto.quantity);
                if (!isAvailable) {
                    throw new common_1.ConflictException(`Product ${product.name} is out of stock`);
                }
                const subTotal = product.price * itemDto.quantity;
                total += subTotal;
                const orderItem = this.orderItemRepository.create({
                    product,
                    quantity: itemDto.quantity,
                    subTotal,
                    order: savedOrder,
                });
                await Promise.all([
                    this.productService.decreaseStock(product.id, itemDto.quantity),
                    queryRunner.manager.save(order_items_entity_1.OrderItem, orderItem),
                ]);
                processedOrderItems.push(orderItem);
            }
            savedOrder.orderItems = processedOrderItems;
            savedOrder.total = total;
            await queryRunner.manager.save(order_entity_1.default, savedOrder);
            await queryRunner.commitTransaction();
            return savedOrder;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.CreateOrderProvider = CreateOrderProvider;
exports.CreateOrderProvider = CreateOrderProvider = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(order_items_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        product_service_1.ProductService])
], CreateOrderProvider);
//# sourceMappingURL=create-order.provider.js.map