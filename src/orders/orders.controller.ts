import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { GetOrderDto } from './dtos/get-order.dto';
import { GetByParamDto } from '../common/get-by-param';
import { OrderService } from './providers/order.service';
import { Roles } from '../auth/decorator/authorization/role.decorator';
import { Role } from '../auth/enums/role-type.enum';
import { CreateOrderDto } from './dtos/create-order.dto';
import { RolesGuard } from '../auth/guards/authorization/roles.guard';
import { PatchOrderDto } from './dtos/patch-order.dto';
import { RequireParamDto } from '../common/require-param';
import { REQUEST_USER_KEY } from '../auth/constants/auth.constants';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';
import { createHmac } from 'crypto';
import { UpdateOrderStatusDto } from './dtos/update-status-order.dto';
import { StatusOrder } from './enum/StatusOrder.enum';

@Auth(AuthType.BEARER)
@Roles(Role.CUSTOMER, Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  // Get orders of users
  @Get('/:id?')
  getOrders(
    @Param() getOrderParamDto: GetByParamDto,
    @Query() getOrderDto: GetOrderDto,
  ) {
    const { id } = getOrderParamDto;
    const { limit, page } = getOrderDto;
    return id
      ? this.orderService.getOrderById(id)
      : this.orderService.getOrders(limit, page);
  }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ) {
    const user = req[REQUEST_USER_KEY];
    return this.orderService.createOrder(createOrderDto, user);
  }

  @Post('zalopay/create-order')
  async createZaloPayOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ) {
    const user = req[REQUEST_USER_KEY];
    const order = await this.orderService.createOrder(createOrderDto, user);
    return this.orderService.createZaloPayOrder(order);
  }

  @Post('zalopay/callback')
  async zaloPayCallback(@Req() req: Request) {
    const result: any = {};
    const key2 = process.env.ZALO_KEY2;

    try {
      const dataStr = (req.body as any).data;
      const reqMac = (req.body as any).mac;
      const mac = createHmac('sha256', key2).update(dataStr).digest('hex');

      if (reqMac !== mac) {
        result.returncode = -1;
        result.returnmessage = 'mac not equal';
      } else {
        const dataJson = JSON.parse(dataStr);
        const orderId = JSON.parse(dataJson['embed_data']).orderId;
        const orderUpdate = new UpdateOrderStatusDto();
        orderUpdate.isPaid = true;
        orderUpdate.paidDate = new Date().toISOString();
        orderUpdate.statusOrder = StatusOrder.DONE;
        await this.orderService.updateStatusOrder(orderId, orderUpdate);
        result.returncode = 1;
        result.returnmessage = 'success';
      }
    } catch (ex) {
      result.returncode = 0;
      result.returnmessage = ex.message;
    }
    console.log(result);
    return result;
  }
}

// Admin controller
@Auth(AuthType.BEARER)
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get('search')
  searchOrders(@Query() searchQueryDto: SearchQueryDto) {
    const { limit, page, query } = searchQueryDto;
    return this.orderService.searchOrders(
      { limit, page },
      ['order_ID', 'statusOrder'],
      query,
    );
  }

  @Get('filter')
  filterOrders(@Query() filterOrderDto: GetOrderDto) {
    const { limit, page, statusOrder } = filterOrderDto;
    console.log('filterOrderDto', filterOrderDto);
    return this.orderService.filterOrders(limit, page, { statusOrder });
  }

  @Get('count')
  countOrders(@Query() filterOrderDto: GetOrderDto) {
    const { statusOrder } = filterOrderDto;
    return this.orderService.countOrders({ statusOrder });
  }

  @Auth(AuthType.BEARER)
  @UseGuards(RolesGuard)
  @Get('/:id?')
  getOrders(
    @Param() getOrderParamDto: GetByParamDto,
    @Query() getOrderDto: GetOrderDto,
  ) {
    const { id } = getOrderParamDto;
    const { limit, page } = getOrderDto;
    return id
      ? this.orderService.getOrderById(id)
      : this.orderService.getOrders(limit, page);
  }

  @Patch('/:id')
  async updateOrder(
    @Param() patchOrderParamDto: RequireParamDto,
    @Body() patchOrderDto: PatchOrderDto,
  ) {
    const { id } = patchOrderParamDto;
    return this.orderService.updateOrder(id, patchOrderDto);
  }

  @Delete('/:id')
  async deleteOrder(@Param() getOrderParamDto: GetByParamDto) {
    const { id } = getOrderParamDto;
    return this.orderService.deleteOrder(id);
  }
}
