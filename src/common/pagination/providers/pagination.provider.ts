import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { URL } from 'url';
import { Paginated } from '../interfaces/paginated.interface';
@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const [repositories, totalItems] = await Promise.all([
      repository.find({
        where: paginationQuery.status
          ? ({ status: paginationQuery.status } as any)
          : {},
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
        order: { createdAt: 'DESC' } as any,
      }),
      repository.count({
        where: paginationQuery.status
          ? ({ status: paginationQuery.status } as any)
          : {},
      }),
    ]);
    const baseUrl =
      this.request.protocol + '://' + this.request.get('host') + '/';
    const newUrl = new URL(this.request.url, baseUrl);
    const totalPage = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      totalPage === paginationQuery.page
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1 ? 1 : paginationQuery.page - 1;
    const result: Paginated<T> = {
      data: repositories,
      meta: {
        totalItems,
        itemsPerPage: paginationQuery.limit,
        currentPage: paginationQuery.page,
        totalPages: totalPage,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPage}`,
      },
    };
    return result;
  }
}
