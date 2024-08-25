import { IsOptional } from "class-validator";

export class GetUsersParamDto {
  @IsOptional()
  id?: string;
}