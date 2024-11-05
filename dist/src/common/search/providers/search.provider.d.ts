import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { PaginationQueryDto } from '../../../common/pagination/dtos/pagination-query.dto';
import { Paginated } from '../../../common/pagination/interfaces/paginated.interface';
export declare class SearchProvider {
    private readonly request;
    constructor(request: Request);
    searchAndPaginate<T extends ObjectLiteral>(paginationQuery: PaginationQueryDto, repository: Repository<T>, searchFields: string[], searchTerm: string): Promise<Paginated<T>>;
}
