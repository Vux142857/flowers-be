import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrderItem() {
    return 'createOrderItem';
  }

  async getOrderItems() {
    return 'getOrderItems';
  }

  async getOrderItem() {
    return 'getOrderItem';
  }

  async deleteOrderItem() {
    return 'deleteOrderItem';
  }
}
