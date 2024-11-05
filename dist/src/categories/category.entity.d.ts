import { Product } from '../products/product.entity';
export declare class Category {
    id: string;
    name: string;
    description?: string;
    status: string;
    imageUrl: string;
    order: number;
    products?: Product[];
    createdAt: Date;
    updatedAt: Date;
}
