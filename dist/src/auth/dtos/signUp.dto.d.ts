import { CreateUserDto } from '../../users/dtos/create-user.dto';
export declare class SignUpDto extends CreateUserDto {
    confirmPassword: string;
}
