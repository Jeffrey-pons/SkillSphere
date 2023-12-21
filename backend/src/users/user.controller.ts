import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from './entities/user.entity';
import { Role } from './decorators/role.decorator';
import { Roles } from './enum/roles';
import { RolesGuard } from './guards/role.guard';
import { EditMeDto } from './dto/edit-me.dto';
import { UpdateResult } from 'typeorm';
import { EditUserDto } from './dto/edit-user.dto';
import { EditPasswordDto } from './dto/edit-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Promise<Users[]> {
    return this.userService.findAllUser();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Request() req) {
    const user: Users = await this.userService.findOneById(req.user.sub);
    delete user.password;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    const user: Users = await this.userService.findOneById(id);
    delete user.password;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch()
  editMe(@Body() editMeDto: EditMeDto, @Request() req): Promise<UpdateResult> {
    const user = req.user;
    return this.userService.editUser(user.sub, editMeDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  async editUser(
    @Param('id') id: string,
    @Body() editUserDto: EditUserDto,
  ): Promise<UpdateResult> {
    const user: Users = await this.userService.findOneById(id);

    if (user.role != Roles.ADMIN) {
      return this.userService.editUser(id, editUserDto);
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch('me/password')
  async editPassword(
    @Body() editPasswordDto: EditPasswordDto,
    @Request() req,
  ): Promise<UpdateResult> {
    const userId = req.user.sub;
    const user = await this.userService.findOneById(userId);
    if (!(await bcrypt.compare(editPasswordDto.old_password, user.password))) {
      return;
    }

    const newUser = { password: editPasswordDto.new_password };
    return this.userService.editUser(userId, newUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.removeUser(id);
  }

  // to remove for prod
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch('me/grant-admin')
  async grantFreeAdmin(@Request() req): Promise<void> {
    const userId = req.user.sub;
    
    this.userService.setAdmin(userId);
  }
}
