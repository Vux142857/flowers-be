import { ProductService } from './providers/product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';
import { GetByParamDto } from '../common/get-by-param';
import { GetProductDto } from './dtos/get-product.dto';
import { RequireParamDto } from '../common/require-param';
import { CategoryService } from '../categories/providers/categories.service';
import { TagService } from '../tags/providers/tag.service';
import { Product } from './product.entity';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    searchActiveProducts(searchQueryDto: SearchQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<Product>>;
    filterActiveProducts(filterQueryDto: FilterProductDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<Product>>;
    getProducts(getProductParamDto: GetByParamDto, getProductDto: GetProductDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<Product>> | Promise<Product>;
}
export declare class AdminProductController {
    private readonly productService;
    private readonly categoryService;
    private readonly tagService;
    constructor(productService: ProductService, categoryService: CategoryService, tagService: TagService);
    searchProducts(searchQueryDto: SearchQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<Product>>;
    filterProducts(filterQueryDto: FilterProductDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<Product>>;
    countProducts(filterQueryDto: FilterProductDto): Promise<number>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(patchProductParamDto: RequireParamDto, patchProductDto: PatchProductDto): Promise<Product>;
    deleteProduct(deleteProductParamDto: RequireParamDto): Promise<import("typeorm").DeleteResult>;
    private createOrUpdateProduct;
}
