import { IsOptional } from "class-validator";

export class GetProductParamDto {
  @IsOptional()
  id?: string;
}