import {
  IS_EMPTY,
  IsAlphanumeric,
  IsEmail, IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {Level} from "../../_shared/enum/level";
import {Status} from "../enum/status";
import { Roles } from '../enum/roles';

export class EditUserDto {
  @IsOptional()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('fr-FR', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  public username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  public mail: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsEnum(Level)
  public level: Level;

  @IsOptional()
  @IsEnum(Status)
  public status: Status;

  @IsOptional()
  @IsEnum(Roles)
  public role: Roles;
}
