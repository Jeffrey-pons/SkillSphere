import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(mail: string, pass: string) {
    const user: Users = await this.userService.findOneByMail(mail);
    if (await bcrypt.compare(pass, user.password)) {
      const payload = {
        sub: user.id,
        mail: user.mail,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
