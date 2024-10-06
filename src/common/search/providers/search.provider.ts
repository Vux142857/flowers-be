import { Inject, Injectable } from '@nestjs/common';
import { Any, Like, Not, ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { URL } from 'url';
import { Role } from 'src/auth/enums/role-type.enum';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class SearchProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async searchAndPaginate<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    searchFields: string[],
    searchTerm: string,
  ) {
    const entityName = repository.metadata.name;

    let query: Array<Record<string, any>> = paginationQuery.status
      ? [{ status: paginationQuery.status }]
      : [];

    if (searchTerm) {
      const searchConditions = searchFields.map((field) => ({
        [field]: Like(`%${searchTerm}%`),
      }));
      query = [...query, ...searchConditions];
    }

    // Exclude admins
    if (entityName === 'User') {
      query.push({
        roles: Not(Any([Role.ADMIN])),
      });
    }

    const [repositories, totalItems] = await Promise.all([
      repository.find({
        where: query.length > 0 ? query : undefined,
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
        order: { createdAt: 'DESC' } as any,
      }),
      repository.count({
        where: query.length > 0 ? query : undefined,
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
