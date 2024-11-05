import { Role } from '../auth/enums/role-type.enum';
import Order from '../orders/entities/order.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password?: string;
    subscribedId: string;
    googleId: string;
    forgotPasswordToken: string;
    refreshToken: string;
    status: string;
    roles: Role[];
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
