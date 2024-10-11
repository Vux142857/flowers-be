import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { URL } from 'url';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { FilterQueryDto } from '../dtos/filter.dto';

@Injectable()
export class FilterProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async filterAndPaginate<T extends ObjectLiteral>(
    filterQuery: FilterQueryDto,
    repository: Repository<T>,
    filters: Record<string, any>,
  ) {
    let query: Record<string, any> = filterQuery.status
      ? { status: filterQuery.status }
      : {};

    query = { ...query, ...filters };

    if (filters.category) {
      query['category.id'] = filters.category;
      delete query['category'];
    }

    const [repositories, totalItems] = await Promise.all([
      repository.find({
        where: query,
        skip: (filterQuery.page - 1) * filterQuery.limit,
        take: filterQuery.limit,
        order: { createdAt: 'DESC' } as any,
      }),
      repository.count({
        where: query,
      }),
    ]);

    const baseUrl =
      this.request.protocol + '://' + this.request.get('host') + '/';
    const newUrl = new URL(this.request.url, baseUrl);
    const totalPage = Math.ceil(totalItems / filterQuery.limit);
    const nextPage =
      totalPage === filterQuery.page ? filterQuery.page : filterQuery.page + 1;
    const previousPage = filterQuery.page === 1 ? 1 : filterQuery.page - 1;

    const result: Paginated<T> = {
      data: repositories,
      meta: {
        totalItems,
        itemsPerPage: filterQuery.limit,
        currentPage: filterQuery.page,
        totalPages: totalPage,
      },
      links: {
        first: this.buildUrlWithQueryParams(
          filters,
          newUrl,
          1,
          filterQuery.limit,
        ),
        previous: this.buildUrlWithQueryParams(
          filters,
          newUrl,
          previousPage,
          filterQuery.limit,
        ),
        next: this.buildUrlWithQueryParams(
          filters,
          newUrl,
          nextPage,
          filterQuery.limit,
        ),
        last: this.buildUrlWithQueryParams(
          filters,
          newUrl,
          totalPage,
          filterQuery.limit,
        ),
      },
    };

    return result;
  }

  private buildUrlWithQueryParams = (
    filtersObj: Record<string, string>,
    newUrl: URL,
    page: number,
    limit: number,
  ) => {
    newUrl.searchParams.set('page', page.toString());
    newUrl.searchParams.set('limit', limit.toString());

    Object.keys(filtersObj).forEach((key) => {
      if (filtersObj[key]) {
        newUrl.searchParams.set(key, filtersObj[key]);
      }
    });

    return newUrl.href;
  };
}
