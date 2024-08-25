import { IsOptional } from "class-validator";

export class GetCategoryParamDto {
  @IsOptional()
  id?: string;
}