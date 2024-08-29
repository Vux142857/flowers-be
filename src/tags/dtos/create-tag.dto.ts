import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" as a separator, and without space',
  })
  slug: string;

  @IsOptional()
  desciption: string;

  @IsOptional()
  featureImageUrl: string;
}
