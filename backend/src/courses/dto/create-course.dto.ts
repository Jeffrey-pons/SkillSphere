import { IsNotEmpty, MinLength, MaxLength, IsEnum, IsArray } from 'class-validator';
import { Level } from 'src/_shared/enum/level';

export class CreateCourseDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  public title: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  public description: string;

  @IsNotEmpty()
  @IsEnum(Level)
  public level: Level;

  @IsNotEmpty()
  @IsArray()
  public categories: string[];
}
