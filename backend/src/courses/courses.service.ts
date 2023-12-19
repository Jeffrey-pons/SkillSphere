import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, closeSync, openSync, mkdir } from 'fs';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = new Course();
  
    course.title = createCourseDto.title
    course.user_id = 0;
    course.status = 'Pending';
    course.views = 0;
    course.level = createCourseDto.level;

    return this.coursesRepository.create(course);
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  write_file(file_path: string, file: Express.Multer.File) {
    mkdir(file_path, { recursive: true }, (err) => {
      if (err) throw err;
    });
    closeSync(openSync(file_path + file.originalname, 'w'));
    writeFileSync(file_path + file.originalname, file.buffer);
  }
}
