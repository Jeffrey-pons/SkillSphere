import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { Level } from '../../_shared/enum/level';
import { Status } from '../enum/status';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{8,20}$/;

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('fr-FR', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  public username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  public mail: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must contain minimum 8 and maximum 20 characters, ' +
      'at least one uppercase letter, ' +
      'one lowercase letter, ' +
      'one number and ' +
      'one special character',
  })
  public password: string;

  @IsNotEmpty({ message: 'Please select your study level.' })
  @IsEnum(Level)
  public level: Level;

  @IsNotEmpty({ message: 'Please select your status.' })
  @IsEnum(Status)
  public status: Status;
}
