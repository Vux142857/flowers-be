import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dtos/create-user.dto';

export class SignUpDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
