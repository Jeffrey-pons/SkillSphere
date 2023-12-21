import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, closeSync, openSync, mkdir } from 'fs';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import {Users} from "../users/entities/user.entity";
import {FileStatus} from "./enum/file-status";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course: Course = new Course();
    const user: Users = await this.userRepository.findOneBy({
      id: createCourseDto.user_id,
    });

    course.title = createCourseDto.title;
    course.user = user;
    course.status = FileStatus.EN_ATTENTE;
    course.views = 0;
    course.level = createCourseDto.level;

    return this.coursesRepository.create(course);
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOne(id: string): Promise<Course> {
    return this.coursesRepository.findOneBy({ id });
  }

  update(id: string, updateCourseDto: UpdateCourseDto): Promise<UpdateResult> {
    return this.coursesRepository.update(id, updateCourseDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.coursesRepository.delete(id);
  }

  async findByCriteria(criteria: string): Promise<Course[]> {
    const courses: Course[] = await this.findAll();
    return courses.filter((course: Course) => {
      return (
        (!criteria ||
          course.title.toLowerCase().includes(criteria.toLowerCase())) &&
        (!criteria ||
          course.level.toLowerCase().includes(criteria.toLowerCase()))
      );
    });
  }

  write_file(file_path: string, file: Express.Multer.File) {
    mkdir(file_path, { recursive: true }, (err) => {
      if (err) throw err;
    });
    closeSync(openSync(file_path + file.originalname, 'w'));
    writeFileSync(file_path + file.originalname, file.buffer);
  }
}
