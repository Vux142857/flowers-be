import { InternalServerErrorException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { firstValueFrom } from 'rxjs';
import Order from '../entities/order.entity';
import { HttpService } from '@nestjs/axios';

export class ZaloPaymentProvider {
  constructor(private httpService: HttpService) { }

  async createZaloPayment(order: Order) {
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
        ? process.env.SERVER_TEST
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
      console.log(error);
      throw new InternalServerErrorException('ZaloPay Error');
    }
  }
}
