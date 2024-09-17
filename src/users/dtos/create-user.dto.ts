import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StatusType } from 'src/common/statusType.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  address?: string;

  @IsEnum(StatusType)
  @IsOptional()
  status?: StatusType = StatusType.ACTIVE;

  @IsOptional()
  IsAdmin: boolean;
}
