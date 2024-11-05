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
exports.OrderItem = void 0;
const product_entity_1 = require("../../products/product.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const class_transformer_1 = require("class-transformer");
let OrderItem = class OrderItem {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], OrderItem.prototype, "subTotal", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.ManyToOne)(() => order_entity_1.default, (order) => order.orderItems, {
        nullable: false,
        eager: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", order_entity_1.default)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.orderItems, {
        eager: true,
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", product_entity_1.Product)
], OrderItem.prototype, "product", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)()
], OrderItem);
//# sourceMappingURL=order-items.entity.js.map