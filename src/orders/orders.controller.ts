import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { GetOrderDto } from './dtos/get-order.dto';
import { GetByParamDto } from 'src/common/get-by-param';
import { OrderService } from './providers/order.service';
import { Roles } from 'src/auth/decorator/authorization/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { CreateOrderDto } from './dtos/create-order.dto';
import { RolesGuard } from 'src/auth/guards/authorization/roles.guard';
import { PatchOrderDto } from './dtos/patch-order.dto';
import { RequireParamDto } from 'src/common/require-param';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Auth(AuthType.BEARER)
@Roles(Role.CUSTOMER)
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
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];
    return this.orderService.createOrder(createOrderDto, user);
  }
}

@Auth(AuthType.BEARER)
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/orders')
export class OrdersAdminController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
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

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const admin = request[REQUEST_USER_KEY];
    return this.orderService.createOrder(createOrderDto, admin);
  }

  @Patch('/:id')
  async updateOrder(
    @Param() patchOrderParamDto: RequireParamDto,
    @Body() patchOrderDto: PatchOrderDto,
  ) {
    const { id } = patchOrderParamDto;
    return this.orderService.updateOrder(id, patchOrderDto);
  }
}
