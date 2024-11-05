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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloPaymentProvider = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
let ZaloPaymentProvider = class ZaloPaymentProvider {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createZaloPayment(order) {
        const yy = new Date().getFullYear().toString().slice(-2);
        const mm = String(new Date().getMonth() + 1).padStart(2, '0');
        const dd = String(new Date().getUTCDate()).padStart(2, '0');
        const items = order.orderItems.map((item) => ({
            itemid: item.product.id,
            itemname: item.product.name,
            itemprice: item.product.price,
            itemquantity: item.quantity,
        }));
        const server_uri = process.env.NODE_ENV === 'development'
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
        const dataString = params.appid +
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
        const mac = (0, crypto_1.createHmac)('sha256', key1).update(dataString).digest('hex');
        params.mac = mac;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://sandbox.zalopay.com.vn/v001/tpe/createorder', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }));
            return response?.data;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('ZaloPay Error');
        }
    }
};
exports.ZaloPaymentProvider = ZaloPaymentProvider;
exports.ZaloPaymentProvider = ZaloPaymentProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ZaloPaymentProvider);
//# sourceMappingURL=zalo-payment.provider.js.map