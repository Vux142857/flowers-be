import { Product } from '../products/product.entity';
export declare class Suggestion {
    id: string;
    listCombination: string[];
    product: Product;
    createdAt: Date;
    updatedAt: Date;
}
