import { InjectRepository } from '@nestjs/typeorm';
import Order from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { ProductService } from 'src/products/providers/product.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { StatusOrder } from '../enum/StatusOrder.enum';

export class CreateOrderProvider {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    customer: User,
  ): Promise<Order> {
    const queryRunner =
      this.orderRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { orderItems } = createOrderDto;
      let total = 0;

      // Create Order entity
      const order = this.orderRepository.create({
        customer,
        total,
        statusOrder: createOrderDto.statusOrder,
        ...createOrderDto,
      });

      if (!order.isPaid && order.statusOrder === StatusOrder.DONE) {
        throw new ConflictException('Order must be paid before done');
      }

      const savedOrder = await queryRunner.manager.save(Order, order);

      // Process OrderItem
      const processedOrderItems: OrderItem[] = [];

      for (const itemDto of orderItems) {
        const product = await this.productService.getProductById(
          itemDto.product.id,
        );

        if (!product) {
          throw new NotFoundException(
            `Product with ID ${itemDto.product.id} not found`,
          );
        }

        // Check stock before save OrderItem
        const isAvailable = await this.productService.checkStock(
          product.id,
          itemDto.quantity,
        );
        if (!isAvailable) {
          throw new ConflictException(
            `Product ${product.name} is out of stock`,
          );
        }

        const subTotal = product.price * itemDto.quantity;
        total += subTotal;

        // Save OrderItem
        const orderItem = this.orderItemRepository.create({
          product,
          quantity: itemDto.quantity,
          subTotal,
          order: savedOrder,
        });

        // Derease stock
        await Promise.all([
          this.productService.decreaseStock(product.id, itemDto.quantity),
          queryRunner.manager.save(OrderItem, orderItem),
        ]);

        processedOrderItems.push(orderItem);
      }

      // Save Order and OrderItems
      savedOrder.orderItems = processedOrderItems;
      savedOrder.total = total;
      await queryRunner.manager.save(Order, savedOrder);
      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
