import {
  IS_NOT_EMPTY,
  IsNotEmpty,
  Matches,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/;

export class EditPasswordDto {
  @IsNotEmpty()
  public old_password: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: 'Password must contain minimum 8 and maximum 20 characters, ' +
      'at least one uppercase letter, ' +
      'one lowercase letter, ' +
      'one number and ' +
      'one special character',
  })
  public new_password: string;
}
