import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RequireParamDto {
  @ApiProperty({
    description:
      'The id (UUID) of the entity to be fetched or updated, deleted.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(4, {
    message: 'The id must be a valid UUID',
  })
  id: string;
}
