import {Inject, Injectable} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Category} from "../categories/entities/category.entity";
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}
  create(createCourseDto: CreateCourseDto): Course {
    return this.coursesRepository.create(createCourseDto);
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOne(id: number): Promise<Course> {
    return this.coursesRepository.findOneBy({ id });
  }

  update(id: number, updateCourseDto: UpdateCourseDto): Promise<UpdateResult> {
    return this.coursesRepository.update(id, updateCourseDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.coursesRepository.delete(id);
  }

  async findByCriteria(criteria: string): Promise<Course[]> {
    const courses: Course[] = await this.findAll()
    return courses.filter((course: Course) => {
      return (
        (!criteria || course.title.toLowerCase().includes(criteria.toLowerCase())) &&
        (!criteria || course.level.toLowerCase().includes(criteria.toLowerCase()))
      )
    })
  }
}
