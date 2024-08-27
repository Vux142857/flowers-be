import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetByParamDto {
  @ApiPropertyOptional({
    description: "The id of the entity to get",
    type: String,
  })
  @IsOptional()
  id?: string;
}