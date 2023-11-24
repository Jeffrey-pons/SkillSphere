import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

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
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(createUserDto.password, salt);
    const user: Users = new Users();
    user.username = createUserDto.username;
    user.mail = createUserDto.mail;
    user.password = hash;
    user.role = createUserDto.role;

    const date: string = new Date().toDateString();

    user.created_at = date;
    user.last_connexion = date;
    try {
      return await this.userRepository.save(user);
    } catch(e) {
        if(e.code === '23505') {
          const detail = e.detail;
          const columnNameMatch = /Key \(([^)]+)\)/.exec(detail);       
          if (columnNameMatch && columnNameMatch[1]) {
            const columnName = columnNameMatch[1];
            throw new ConflictException(`La valeur dans la colonne '${columnName}' existe déjà.`);
          } else {
            throw new ConflictException('Une erreur de duplication est survenue.');
          }
        } else {
          throw e;
        }
      }
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findOneById(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByMail(mail: string): Promise<Users> {
    return this.userRepository.findOneBy({ mail });
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
