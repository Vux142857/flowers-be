import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { Paginated } from '../../../common/pagination/interfaces/paginated.interface';
import { FilterQueryDto } from '../dtos/filter.dto';
export declare class FilterProvider {
    private readonly request;
    constructor(request: Request);
    filterAndPaginate<T extends ObjectLiteral>(filterQuery: FilterQueryDto, repository: Repository<T>, filters: Record<string, any>): Promise<Paginated<T>>;
    private buildUrlWithQueryParams;
}
