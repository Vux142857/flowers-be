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
exports.AdminOrdersController = exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const auth_type_enum_1 = require("../auth/enums/auth-type.enum");
const get_order_dto_1 = require("./dtos/get-order.dto");
const get_by_param_1 = require("../common/get-by-param");
const order_service_1 = require("./providers/order.service");
const role_decorator_1 = require("../auth/decorator/authorization/role.decorator");
const role_type_enum_1 = require("../auth/enums/role-type.enum");
const create_order_dto_1 = require("./dtos/create-order.dto");
const roles_guard_1 = require("../auth/guards/authorization/roles.guard");
const patch_order_dto_1 = require("./dtos/patch-order.dto");
const require_param_1 = require("../common/require-param");
const auth_constants_1 = require("../auth/constants/auth.constants");
const search_query_dto_1 = require("../common/search/dtos/search-query.dto");
const crypto_1 = require("crypto");
const update_status_order_dto_1 = require("./dtos/update-status-order.dto");
const StatusOrder_enum_1 = require("./enum/StatusOrder.enum");
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrders(getOrderParamDto, getOrderDto) {
        const { id } = getOrderParamDto;
        const { limit, page } = getOrderDto;
        return id
            ? this.orderService.getOrderById(id)
            : this.orderService.getOrders(limit, page);
    }
    async createOrder(createOrderDto, req) {
        const user = req[auth_constants_1.REQUEST_USER_KEY];
        return this.orderService.createOrder(createOrderDto, user);
    }
    async createZaloPayOrder(createOrderDto, req) {
        const user = req[auth_constants_1.REQUEST_USER_KEY];
        const order = await this.orderService.createOrder(createOrderDto, user);
        return this.orderService.createZaloPayOrder(order);
    }
    async zaloPayCallback(req) {
        const result = {};
        const key2 = process.env.ZALO_KEY2;
        try {
            const dataStr = req.body.data;
            const reqMac = req.body.mac;
            const mac = (0, crypto_1.createHmac)('sha256', key2).update(dataStr).digest('hex');
            if (reqMac !== mac) {
                result.returncode = -1;
                result.returnmessage = 'mac not equal';
            }
            else {
                const dataJson = JSON.parse(dataStr);
                const orderId = JSON.parse(dataJson['embed_data']).orderId;
                const orderUpdate = new update_status_order_dto_1.UpdateOrderStatusDto();
                orderUpdate.isPaid = true;
                orderUpdate.paidDate = new Date().toISOString();
                orderUpdate.statusOrder = StatusOrder_enum_1.StatusOrder.DONE;
                await this.orderService.updateStatusOrder(orderId, orderUpdate);
                result.returncode = 1;
                result.returnmessage = 'success';
            }
        }
        catch (ex) {
            result.returncode = 0;
            result.returnmessage = ex.message;
        }
        console.log(result);
        return result;
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)('/:id?'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_order_dto_1.GetOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto,
        Request]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('zalopay/create-order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto,
        Request]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createZaloPayOrder", null);
__decorate([
    (0, common_1.Post)('zalopay/callback'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "zaloPayCallback", null);
exports.OrdersController = OrdersController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.CUSTOMER, role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrdersController);
let AdminOrdersController = class AdminOrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    searchOrders(searchQueryDto) {
        const { limit, page, query } = searchQueryDto;
        return this.orderService.searchOrders({ limit, page }, ['order_ID', 'statusOrder'], query);
    }
    filterOrders(filterOrderDto) {
        const { limit, page, statusOrder } = filterOrderDto;
        console.log('filterOrderDto', filterOrderDto);
        return this.orderService.filterOrders(limit, page, { statusOrder });
    }
    countOrders(filterOrderDto) {
        const { statusOrder } = filterOrderDto;
        return this.orderService.countOrders({ statusOrder });
    }
    getOrders(getOrderParamDto, getOrderDto) {
        const { id } = getOrderParamDto;
        const { limit, page } = getOrderDto;
        return id
            ? this.orderService.getOrderById(id)
            : this.orderService.getOrders(limit, page);
    }
    async updateOrder(patchOrderParamDto, patchOrderDto) {
        const { id } = patchOrderParamDto;
        return this.orderService.updateOrder(id, patchOrderDto);
    }
    async deleteOrder(getOrderParamDto) {
        const { id } = getOrderParamDto;
        return this.orderService.deleteOrder(id);
    }
};
exports.AdminOrdersController = AdminOrdersController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchQueryDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "searchOrders", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_order_dto_1.GetOrderDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "filterOrders", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_order_dto_1.GetOrderDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "countOrders", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/:id?'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_order_dto_1.GetOrderDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto,
        patch_order_dto_1.PatchOrderDto]),
    __metadata("design:returntype", Promise)
], AdminOrdersController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto]),
    __metadata("design:returntype", Promise)
], AdminOrdersController.prototype, "deleteOrder", null);
exports.AdminOrdersController = AdminOrdersController = __decorate([
    (0, auth_decorator_1.Auth)(auth_type_enum_1.AuthType.BEARER),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], AdminOrdersController);
//# sourceMappingURL=orders.controller.js.map