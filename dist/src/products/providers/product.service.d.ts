import { CreateProductDto } from '../dtos/create-product.dto';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Tag } from '../../tags/tag.entity';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';
import { SearchProvider } from '../../common/search/providers/search.provider';
import { StatusType } from '../../common/statusType.enum';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { FilterProvider } from '../../common/filter/providers/filter.provider';
export declare class ProductService {
    private readonly productRepository;
    private readonly paginationProvider;
    private readonly searchProvider;
    private readonly filterProvider;
    constructor(productRepository: Repository<Product>, paginationProvider: PaginationProvider, searchProvider: SearchProvider, filterProvider: FilterProvider);
    getProducts(limit: number, page: number): Promise<Paginated<Product>>;
    getProductsByStatus(limit: number, page: number, status: StatusType): Promise<Paginated<Product>>;
    filterProducts(limit: number, page: number, category: string, status?: StatusType): Promise<Paginated<Product>>;
    searchProducts(paginationQuery: PaginationQueryDto, fields: string[], query: string): Promise<Paginated<Product>>;
    getProductById(id: string): Promise<Product>;
    countProducts(query: Record<string, string>): Promise<number>;
    createProduct(payload: CreateProductDto, category: Category, tags?: Tag[]): Promise<{
        slug: string;
        category: Category;
        tags: any;
        name: string;
        status: StatusType;
        categoryId: string;
        imageUrl: string;
        price: number;
        remaining: number;
        description?: string;
        couponCode?: string;
        suggestion: import("../../suggestions/dtos/create-suggestions.dto").CreateSuggestionDto | null;
    } & Product>;
    updateProduct(id: string, payload: PatchProductDto, category?: Category, tags?: Tag[]): Promise<Product>;
    deleteProduct(id: string): Promise<import("typeorm").DeleteResult>;
    checkStock(productId: string, quantity: number): Promise<boolean>;
    decreaseStock(productId: string, quantity: number): Promise<void>;
}