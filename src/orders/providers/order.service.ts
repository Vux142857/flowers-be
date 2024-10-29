import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from '../entities/order.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateOrderProvider } from './create-order.provider';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { PatchOrderDto } from '../dtos/patch-order.dto';
import { User } from 'src/users/user.entity';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { SearchProvider } from 'src/common/search/providers/search.provider';
import { GetOrderDto } from '../dtos/get-order.dto';
import { FilterProvider } from 'src/common/filter/providers/filter.provider';
import { UpdateOrderStatusDto } from '../dtos/update-status-order.dto';
import { ZaloPaymentProvider } from './zalo-payment.provider';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly paginationProvider: PaginationProvider,

    private readonly searchProvider: SearchProvider,

    private readonly filterProvider: FilterProvider,

    private readonly createOrderProvider: CreateOrderProvider,

    private readonly creatZaloPaymentProvider: ZaloPaymentProvider,
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

  async filterOrders(limit: number, page: number, filterOrderDto: GetOrderDto) {
    const { statusOrder } = filterOrderDto;
    return await this.filterProvider.filterAndPaginate<Order>(
      { limit, page },
      this.orderRepository,
      { statusOrder },
    );
  }

  async countOrders(query: Record<string, string>) {
    return await this.orderRepository.count({ where: query });
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

  async updateStatusOrder(id: string, statusOrder: UpdateOrderStatusDto) {
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

  async createZaloPayOrder(order: Order) {
    return await this.creatZaloPaymentProvider.createZaloPayment(order);
  }
}
