import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Roles } from './enum/roles';
import { EditPasswordDto } from './dto/edit-password.dto';

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
    const users: Users[] = await this.userRepository.find({
      relations: ['courses'],
    });

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOneById(id: string): Promise<Users> {
    return this.userRepository.findOne({
      relations: ['courses'],
      where: { id: id },
    });
  }

  findOneByMail(mail: string): Promise<Users> {
    return this.userRepository.findOneBy({ mail });
  }

  editUser(userId: string, userData: Partial<Users>): Promise<UpdateResult> {
    return this.userRepository.update({ id: userId }, userData);
  }

  async editUserPwd(
    userId: string,
    userData: EditPasswordDto,
  ): Promise<UpdateResult> {
    const user: Users = await this.findOneById(userId);
    if (await bcrypt.compare(userData.old_password, user.password)) {
      const salt: string = await bcrypt.genSalt();
      const password: string = await bcrypt.hash(userData.new_password, salt);
      return this.userRepository
        .createQueryBuilder()
        .update(Users)
        .set({ password })
        .where('id = :userId', { userId })
        .execute();
    } else {
      throw new UnauthorizedException();
    }
  }

  updateUserRole(id: string, role: Roles): Promise<UpdateResult> {
    return this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set({ role })
      .where('id = :id', { id })
      .execute();
  }

  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  // remove for prod
  setAdmin(userId: string): void {
    this.userRepository.update({ id: userId }, { role: Roles.ADMIN });
  }
}
