import { Inject, Injectable } from '@nestjs/common';
import { Any, ILike, Not, ObjectLiteral, Repository } from 'typeorm';
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
    let query: any = paginationQuery.status
      ? { status: paginationQuery.status }
      : {};

    // Search logic: dynamically build search query using ILike for partial matches
    if (searchTerm) {
      query = {
        ...query,
        ...searchFields.reduce((acc, field) => {
          acc[field] = ILike(`%${searchTerm}%`);
          return acc;
        }, {}),
      };
    }

    // Special case for 'User' entity to exclude admins
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