import { IsUUID } from "class-validator";

export class RequireParamDto {
  @IsUUID()
  id: string;
}