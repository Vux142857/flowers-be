import { AuthType } from '../enums/auth-type.enum';
export declare const Auth: (...authTypes: AuthType[]) => import("@nestjs/common").CustomDecorator<string>;
