import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '../enum/roles';
export class EditRoleDto {
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  public role: Roles;
}
