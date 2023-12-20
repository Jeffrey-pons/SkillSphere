import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Promise<Users[]> {
    return this.userService.findAllUser();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findOneById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.removeUser(id);
  }
}
