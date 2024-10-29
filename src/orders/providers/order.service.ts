import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
import { firstValueFrom } from 'rxjs';
import { createHmac } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { UpdateOrderStatusDto } from '../dtos/update-status-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly paginationProvider: PaginationProvider,

    private readonly createOrderProvider: CreateOrderProvider,

    private readonly searchProvider: SearchProvider,

    private readonly filterProvider: FilterProvider,

    private readonly httpService: HttpService,
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
    const yy = new Date().getFullYear().toString().slice(-2);
    const mm = String(new Date(Date.now()).getMonth() + 1).padStart(2, '0');
    const dd = String(new Date(Date.now()).getUTCDate()).padStart(2, '0');

    const items = order.orderItems.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_price: item.product.price,
      item_quantity: item.quantity,
    }));

    const server_uri =
      process.env.NODE_ENV === 'development'
        ? 'https://57c4-101-99-32-135.ap.ngrok.io'
        : process.env.SERVER;
    // ngrok http --host-header=localhost http://localhost:4000
    const callback_url = `${server_uri}/order/zalopay/callback`;

    const params = {
      app_id: process.env.ZALO_APP_ID,
      app_user: order.fullName,
      app_trans_id: `${yy}${mm}${dd}_${order.id}_${Date.now()}`,
      embed_data: JSON.stringify({
        redirecturl: `${process.env.CLIENT}/order/${order.id}`,
        orderId: order.id,
      }),
      amount: order.total,
      item: JSON.stringify(items),
      description: `Thanh toán cho đơn hàng #${order.order_ID}`,
      app_time: Date.now(),
      bank_code: 'zalopayapp',
      phone: order.phone.toString(),
      address: order.address,
      mac: '',
      callback_url,
    };

    const data =
      params.app_id +
      '|' +
      params.app_trans_id +
      '|' +
      params.app_user +
      '|' +
      params.amount +
      '|' +
      params.app_time +
      '|' +
      params.embed_data +
      '|' +
      params.item;

    const key1 = process.env.ZALO_KEY1;

    // const mac = CryptoJS.HmacSHA256(data, key1).toString();
    const mac = createHmac('sha256', key1).update(data).digest('hex');
    params.mac = mac;

    try {
      return (
        await firstValueFrom(
          this.httpService.post('https://sb-openapi.zalopay.vn/v2/create', {
            ...params,
          }),
        )
      ).data;
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException('ZaloPay Error');
    }
  }
}
