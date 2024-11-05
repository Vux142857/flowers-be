import { Category } from '../categories/category.entity';
import { Coupon } from '../coupons/coupon.entity';
import { OrderItem } from '../orders/entities/order-items.entity';
import { Suggestion } from '../suggestions/suggestion.entity';
import { Tag } from '../tags/tag.entity';
export declare class Product {
    id: string;
    name: string;
    status: string;
    slug: string;
    price: number;
    remaining: number;
    description?: string;
    imageUrl: string;
    tags?: Tag[];
    category: Category;
    orderItems?: OrderItem[];
    coupon?: Coupon;
    suggestion?: Suggestion;
    createdAt: Date;
    updatedAt: Date;
}
