import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<Omit<Users, 'password'>> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(createUserDto.password, salt);
    const date: Date = new Date();

    const user: Users = new Users();
    user.username = createUserDto.username;
    user.mail = createUserDto.mail;
    user.password = hash;
    user.last_connexion = date;

    return this.userRepository.save(user).then((user: Users) => {
      delete user.password;
      return user;
    });
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  async findAllUser(): Promise<Users[]> {
    const users: Users[] = await this.userRepository.find();

    return users.map(user => {
      delete user.password;
      return user;
    })
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  async findOneById(id: string): Promise<Users> {
    const user: Users = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  findOneByMail(mail: string): Promise<Users> {
    return this.userRepository.findOneBy({ mail });
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
