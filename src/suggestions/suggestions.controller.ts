import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RequireParamDto } from '../common/require-param';
import { PatchSuggestionDto } from './dtos/patch-suggestions.dto';
import { GetByParamDto } from '../common/get-by-param';
import { CreateSuggestionDto } from './dtos/create-suggestions.dto';
import { GetSuggestionDto } from './dtos/get-suggestion.dto';
import { SuggestionService } from './providers/suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Get('/:id?')
  @ApiOperation({ summary: 'Get all products or get only one product by id' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully found.',
  })
  @ApiQuery({ name: 'page', type: 'numberf', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  getSuggestions(
    @Param() getProductParamDto: GetByParamDto,
    @Query() getProductDto: GetSuggestionDto,
  ) {
    const { id } = getProductParamDto;
    const { limit, page } = getProductDto;
    return id
      ? this.suggestionService.getSuggestion(id)
      : this.suggestionService.getSuggestions(limit, page);
  }

  @Post()
  createSuggestion(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionService.createSuggestion(createSuggestionDto);
  }

  @Patch('/:id')
  updateSuggestion(
    @Param() patchSuggestionParamDto: RequireParamDto,
    @Body() patchSuggestionDto: PatchSuggestionDto,
  ) {
    const { id } = patchSuggestionParamDto;
    return this.suggestionService.updateSuggestion(id, patchSuggestionDto);
  }

  @Delete('/:id')
  deleteSuggestion(@Param() deleteProductParamDto: RequireParamDto) {
    const { id } = deleteProductParamDto;
    return this.suggestionService.deleteSuggestion(id);
  }
}
