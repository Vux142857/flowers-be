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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const pagination_provider_1 = require("../../common/pagination/providers/pagination.provider");
const create_order_provider_1 = require("./create-order.provider");
const search_provider_1 = require("../../common/search/providers/search.provider");
const filter_provider_1 = require("../../common/filter/providers/filter.provider");
const zalo_payment_provider_1 = require("./zalo-payment.provider");
let OrderService = class OrderService {
    constructor(orderRepository, paginationProvider, searchProvider, filterProvider, createOrderProvider, creatZaloPaymentProvider) {
        this.orderRepository = orderRepository;
        this.paginationProvider = paginationProvider;
        this.searchProvider = searchProvider;
        this.filterProvider = filterProvider;
        this.createOrderProvider = createOrderProvider;
        this.creatZaloPaymentProvider = creatZaloPaymentProvider;
    }
    async getOrders(limit, page) {
        return await this.paginationProvider.paginateQuery({ limit, page }, this.orderRepository);
    }
    async getOrderById(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return order;
    }
    async searchOrders(paginationQuery, fields, query) {
        return await this.searchProvider.searchAndPaginate(paginationQuery, this.orderRepository, fields, query);
    }
    async filterOrders(limit, page, filterOrderDto) {
        const { statusOrder } = filterOrderDto;
        return await this.filterProvider.filterAndPaginate({ limit, page }, this.orderRepository, { statusOrder });
    }
    async countOrders(query) {
        return await this.orderRepository.count({ where: query });
    }
    async createOrder(createOrderDto, customer) {
        return this.createOrderProvider.createOrder(createOrderDto, customer);
    }
    async updateOrder(id, payload) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return await this.orderRepository.save({ ...order, ...payload });
    }
    async updateStatusOrder(id, statusOrder) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return await this.orderRepository.update({ id }, { statusOrder: statusOrder.statusOrder });
    }
    async deleteOrder(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return await this.orderRepository.remove(order);
    }
    async createZaloPayOrder(order) {
        return await this.creatZaloPaymentProvider.createZaloPayment(order);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pagination_provider_1.PaginationProvider,
        search_provider_1.SearchProvider,
        filter_provider_1.FilterProvider,
        create_order_provider_1.CreateOrderProvider,
        zalo_payment_provider_1.ZaloPaymentProvider])
], OrderService);
//# sourceMappingURL=order.service.js.map