import { IsEnum, IsOptional, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';
import { StatusType } from 'src/common/statusType.enum';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsEnum(StatusType)
  status?: StatusType = StatusType.ACTIVE;
}
