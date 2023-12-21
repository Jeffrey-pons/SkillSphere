import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EditMeDto } from './dto/edit-me.dto';
import { Roles } from './enum/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(createUserDto.password, salt);
    const date: Date = new Date();

    const user: Users = new Users();
    user.username = createUserDto.username;
    user.mail = createUserDto.mail;
    user.password = hash;
    user.last_connexion = date;
    user.status = createUserDto.status;
    user.level = createUserDto.level;

    return this.userRepository.save(user).then((user: Users) => {
      delete user.password;
      return user;
    });
  }

  async findAllUser(): Promise<Users[]> {
    const users: Users[] = await this.userRepository.find();

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOneById(id: string): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByMail(mail: string): Promise<Users> {
    return this.userRepository.findOneBy({ mail });
  }

  editUser(userId: string, userData: Partial<Users>): Promise<UpdateResult> {
    return this.userRepository.update({ id: userId }, userData);
  }

  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  // remove for prod
  setAdmin(userId: string): void {
    this.userRepository.update({ id: userId }, { role: Roles.ADMIN });
  }
}
