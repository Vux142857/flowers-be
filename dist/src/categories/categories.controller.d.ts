import { GetCategoryDto } from './dtos/get-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PatchCategoryDto } from './dtos/patch-category.dto';
import { GetByParamDto } from '../common/get-by-param';
import { RequireParamDto } from '../common/require-param';
import { CategoryService } from './providers/categories.service';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';
export declare class CategoriesController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    searchCategories(searchQueryDto: SearchQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./category.entity").Category>>;
    filterCategories(filterCategoryDto: GetCategoryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./category.entity").Category>>;
    countCategories(filterQueryDto: GetCategoryDto): Promise<number>;
    getCategories(getCategoryParamDto: GetByParamDto, getCategoryDto: GetCategoryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./category.entity").Category>> | Promise<import("./category.entity").Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & import("./category.entity").Category>;
    updateCategory(patchCategory: RequireParamDto, patchCategoryDto: PatchCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(deleteCategory: RequireParamDto): Promise<import("typeorm").DeleteResult>;
}
