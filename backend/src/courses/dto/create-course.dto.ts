import { IsNotEmpty, MinLength, MaxLength, IsEnum, IsArray } from 'class-validator';
import { Level } from 'src/_shared/enum/level';
import { Category } from 'src/categories/entities/category.entity';

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
  public categoryId: string;
}
