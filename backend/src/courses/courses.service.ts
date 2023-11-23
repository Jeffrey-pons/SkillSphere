import {Inject, Injectable} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {Repository} from "typeorm";
import {Category} from "../categories/entities/category.entity";
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.create(createCourseDto);
  }

  findAll() {
    return `This action returns all courses`;
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
}
