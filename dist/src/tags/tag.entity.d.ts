import { Product } from '../products/product.entity';
export declare class Tag {
    id: string;
    name: string;
    slug: string;
    desciption: string;
    featureImageUrl: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
