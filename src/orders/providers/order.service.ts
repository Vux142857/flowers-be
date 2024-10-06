import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from '../entities/order.entity';
import { OrderItem } from '../entities/order-items.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateOrderProvider } from './create-order.provider';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { PatchOrderDto } from '../dtos/patch-order.dto';
import { User } from 'src/users/user.entity';
import { UpdateStatusOrderDto } from '../dtos/update-status-order.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { SearchProvider } from 'src/common/search/providers/search.provider';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly paginationProvider: PaginationProvider,

    private readonly createOrderProvider: CreateOrderProvider,

    private readonly searchProvider: SearchProvider,
  ) {}

  async getOrders(limit: number, page: number): Promise<Paginated<Order>> {
    return await this.paginationProvider.paginateQuery<Order>(
      { limit, page },
      this.orderRepository,
    );
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async searchOrders(
    paginationQuery: PaginationQueryDto,
    fields: string[],
    query: string,
  ) {
    return await this.searchProvider.searchAndPaginate<Order>(
      paginationQuery,
      this.orderRepository,
      fields,
      query,
    );
  }

  async createOrder(createOrderDto: CreateOrderDto, customer: User) {
    return this.createOrderProvider.createOrder(createOrderDto, customer);
  }

  async updateOrder(id: string, payload: PatchOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return await this.orderRepository.save({ ...order, ...payload });
  }

  async updateStatusOrder(id: string, statusOrder: UpdateStatusOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return await this.orderRepository.update(
      { id },
      { statusOrder: statusOrder.statusOrder },
    );
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return await this.orderRepository.remove(order);
  }
}
