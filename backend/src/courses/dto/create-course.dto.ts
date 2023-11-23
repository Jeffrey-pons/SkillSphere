import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  I
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  file: string;
  user_id: string;
  status: string;
  level: string;
}
