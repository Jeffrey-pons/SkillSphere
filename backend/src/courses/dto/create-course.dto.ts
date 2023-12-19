import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  level: string;
}
