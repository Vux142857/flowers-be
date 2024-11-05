import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCategoryDto } from './dtos/get-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { PatchCategoryDto } from './dtos/patch-category.dto';
import { GetByParamDto } from '../common/get-by-param';
import { RequireParamDto } from '../common/require-param';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './providers/categories.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Role } from '../auth/enums/role-type.enum';
import { RolesGuard } from '../auth/guards/authorization/roles.guard';
import { Roles } from '../auth/decorator/authorization/role.decorator';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('search')
  searchCategories(@Query() searchQueryDto: SearchQueryDto) {
    const { limit, page, query } = searchQueryDto;
    return this.categoryService.searchCategories(
      { limit, page },
      ['name'],
      query,
    );
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('filter')
  filterCategories(@Query() filterCategoryDto: GetCategoryDto) {
    const { limit, page, status } = filterCategoryDto;
    return this.categoryService.filterCategories(limit, page, { status });
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('count')
  countCategories(@Query() filterQueryDto: GetCategoryDto) {
    const { status } = filterQueryDto;
    let query = {};
    if (status) {
      query = { ...query, status };
    }
    return this.categoryService.countCategories(query);
  }

  @Get('/:id?')
  @Auth(AuthType.NONE)
  @ApiOperation({
    summary: 'Get all categories or get only one category by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully found.',
  })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  getCategories(
    @Param() getCategoryParamDto: GetByParamDto,
    @Query() getCategoryDto: GetCategoryDto,
  ) {
    const { id } = getCategoryParamDto;
    const { limit, page } = getCategoryDto;
    return id
      ? this.categoryService.getCategory(id)
      : this.categoryService.getCategories(limit, page);
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('/:id')
  updateCategory(
    @Param() patchCategory: RequireParamDto,
    @Body() patchCategoryDto: PatchCategoryDto,
  ) {
    const { id } = patchCategory;
    return this.categoryService.updateCategory(id, patchCategoryDto);
  }

  @Auth(AuthType.BEARER)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:id')
  deleteCategory(@Param() deleteCategory: RequireParamDto) {
    const { id } = deleteCategory;
    return this.categoryService.deleteCategory(id);
  }
}
