import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { firstValueFrom } from 'rxjs';
import Order from '../entities/order.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ZaloPaymentProvider {
  constructor(private httpService: HttpService) {}

  async createZaloPayment(order: Order) {
    const yy = new Date().getFullYear().toString().slice(-2);
    const mm = String(new Date().getMonth() + 1).padStart(2, '0');
    const dd = String(new Date().getUTCDate()).padStart(2, '0');

    const items = order.orderItems.map((item) => ({
      itemid: item.product.id,
      itemname: item.product.name,
      itemprice: item.product.price,
      itemquantity: item.quantity,
    }));

    const server_uri =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_TEST
        : process.env.SERVER;
    const callback_url = `${server_uri}/order/zalopay/callback`;

    const params = {
      appid: process.env.ZALO_APP_ID,
      appuser: order.fullName,
      apptime: Date.now(),
      apptransid: `${yy}${mm}${dd}_${order.id}_${Date.now()}`,
      embeddata: JSON.stringify({
        redirect_url: `${process.env.CLIENT}/order/${order.id}`,
        orderId: order.id,
        callback_url,
      }),
      amount: order.total,
      item: JSON.stringify(items),
      description: `Thanh toán cho đơn hàng #${order.order_ID}`,
      bankcode: '',
      phone: order.phone?.toString(),
      address: order.address,
      mac: '',
    };

    const dataString =
      params.appid +
      '|' +
      params.apptransid +
      '|' +
      params.appuser +
      '|' +
      params.amount +
      '|' +
      params.apptime +
      '|' +
      params.embeddata +
      '|' +
      params.item;

    const key1 = process.env.ZALO_KEY1;
    const mac = createHmac('sha256', key1).update(dataString).digest('hex');
    params.mac = mac;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://sandbox.zalopay.com.vn/v001/tpe/createorder',
          params,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        ),
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('ZaloPay Error');
    }
  }
}
