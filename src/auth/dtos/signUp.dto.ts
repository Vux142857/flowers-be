import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class SignUpDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
