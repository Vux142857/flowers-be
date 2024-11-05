"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./orders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_items_entity_1 = require("./entities/order-items.entity");
const order_service_1 = require("./providers/order.service");
const products_module_1 = require("../products/products.module");
const pagination_module_1 = require("../common/pagination/pagination.module");
const create_order_provider_1 = require("./providers/create-order.provider");
const order_items_service_1 = require("./providers/order-items.service");
const users_module_1 = require("../users/users.module");
const user_entity_1 = require("../users/user.entity");
const search_module_1 = require("../common/search/search.module");
const filter_module_1 = require("../common/filter/filter.module");
const axios_1 = require("@nestjs/axios");
const zalo_payment_provider_1 = require("./providers/zalo-payment.provider");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [orders_controller_1.OrdersController, orders_controller_1.AdminOrdersController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.default, order_items_entity_1.OrderItem, user_entity_1.User]),
            products_module_1.ProductsModule,
            pagination_module_1.PaginationModule,
            users_module_1.UsersModule,
            search_module_1.SearchModule,
            filter_module_1.FilterModule,
            axios_1.HttpModule,
        ],
        providers: [
            order_service_1.OrderService,
            create_order_provider_1.CreateOrderProvider,
            order_items_service_1.OrderItemsService,
            zalo_payment_provider_1.ZaloPaymentProvider,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map