import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Any, Not, ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { URL } from 'url';
import { Paginated } from '../interfaces/paginated.interface';
import { Role } from 'src/auth/enums/role-type.enum';

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
    const entityName = repository.metadata.name;

    let query: any =
      entityName === 'Order'
        ? { status: paginationQuery.statusOrder }
        : { status: paginationQuery.status };

    if (entityName === 'User') {
      query = {
        ...query,
        roles: Not(Any([Role.ADMIN])),
      };
    }

    const [repositories, totalItems] = await Promise.all([
      repository.find({
        where: query,
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
        order: { createdAt: 'DESC' } as any,
      }),
      repository.count({
        where: query,
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
