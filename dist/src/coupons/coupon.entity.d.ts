import { Product } from '../products/product.entity';
export declare class Coupon {
    id: number;
    code: string;
    value: number;
    status: string;
    remaining: number;
    type: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
