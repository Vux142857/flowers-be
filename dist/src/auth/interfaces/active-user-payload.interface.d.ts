import { Role } from '../enums/role-type.enum';
export interface ActiveUserPayload {
    email: string;
    sub: string;
    roles: Role[];
    status: string;
}
