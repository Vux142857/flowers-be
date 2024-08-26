import { IsOptional, IsUUID } from "class-validator";

export class GetByParamDto {
  @IsOptional()
  @IsUUID()
  id?: string;
}