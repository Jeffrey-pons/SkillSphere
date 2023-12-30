import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Request,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Course } from './entities/course.entity';
import { Roles } from 'src/users/enum/roles';
import { RolesGuard } from 'src/users/guards/role.guard';
import { Role } from 'src/users/decorators/role.decorator';
import { FileStatus } from './enum/file-status';
import { UpdateCourseDto } from './dto/update-course.dto';
import {UpdateResult} from "typeorm";

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
    @Request() req,
  ): Promise<Course> {
    const user = req.user;
    return this.coursesService.create(
      user.sub,
      {
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        categoryId: req.body.categoryId,
      },
      file,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
    return this.coursesService.update(id, updateCourseDto, file);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const course: Course = await this.coursesService.findOne(id);

    if (user.role != Roles.ADMIN && course.userId != user.sub) {
      throw new UnauthorizedException();
    }

    this.coursesService.remove(course);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Patch('accept/:id')
  accept(@Param('id') id: string) {
    return this.coursesService.updateStatus(id, FileStatus.ACCEPTE);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Patch('decline/:id')
  decline(@Param('id') id: string) {
    return this.coursesService.updateStatus(id, FileStatus.REFUSE);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':criteria')
  findByCriteria(@Param('criteria') criteria: string): Promise<Course[]> {
    return this.coursesService.findByCriteria(criteria);
  }
}
