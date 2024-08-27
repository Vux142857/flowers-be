import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class RequireParamDto {
  @ApiProperty(
    {
      description: 'The id (UUID) of the entity to be fetched or updated',
      example: '123e4567-e89b-12d3-a456-426614174000'
    }
  )
  @IsUUID()
  id: string;
}