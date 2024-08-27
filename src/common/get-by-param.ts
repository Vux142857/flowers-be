import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetByParamDto {
  @ApiPropertyOptional({
    description: 'The id of the entity to get',
    type: String,
  })
  @IsOptional()
  @IsUUID(4, {
    message: 'The id must be a valid UUID',
  })
  id?: string;
}
