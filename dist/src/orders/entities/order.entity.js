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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/user.entity");
const StatusOrder_enum_1 = require("../enum/StatusOrder.enum");
const order_items_entity_1 = require("./order-items.entity");
const PaymentMethod_enum_1 = require("../enum/PaymentMethod.enum");
let Order = class Order {
    generateReadableId() {
        this.order_ID = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ fulltext: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "order_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "shippingCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: PaymentMethod_enum_1.PaymentMethod.COD }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Order.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "statusOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_items_entity_1.OrderItem, (orderItem) => orderItem.order, {
        cascade: ['update', 'remove'],
        eager: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "paidDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Order.prototype, "generateReadableId", null);
Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
exports.default = Order;
//# sourceMappingURL=order.entity.js.map