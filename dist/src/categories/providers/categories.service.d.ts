import { CreateCategoryDto } from '../dtos/create-category.dto';
import { PatchCategoryDto } from '../dtos/patch-category.dto';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { SearchProvider } from '../../common/search/providers/search.provider';
import { FilterProvider } from '../../common/filter/providers/filter.provider';
import { GetCategoryDto } from '../dtos/get-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly paginationProvider;
    private readonly searchProvider;
    private readonly filterProvider;
    constructor(categoryRepository: Repository<Category>, paginationProvider: PaginationProvider, searchProvider: SearchProvider, filterProvider: FilterProvider);
    getCategories(limit: number, page: number): Promise<import("../../common/pagination/interfaces/paginated.interface").Paginated<Category>>;
    getCategory(id: string): Promise<Category>;
    searchCategories(paginationQuery: PaginationQueryDto, fields: string[], query: string): Promise<import("../../common/pagination/interfaces/paginated.interface").Paginated<Category>>;
    filterCategories(limit: number, page: number, filterProductDto: GetCategoryDto): Promise<import("../../common/pagination/interfaces/paginated.interface").Paginated<Category>>;
    countCategories(query: Record<string, string>): Promise<number>;
    createCategory(payload: CreateCategoryDto): Promise<CreateCategoryDto & Category>;
    updateCategory(id: string, payload: PatchCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
