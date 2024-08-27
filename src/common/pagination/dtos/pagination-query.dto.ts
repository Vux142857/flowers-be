import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  page?: number = 1;
}