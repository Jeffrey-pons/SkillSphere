import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync, closeSync, openSync, mkdir } from 'fs';
import { Express } from 'express';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private categoriesService: CategoriesService,
  ) {}

  async create(userId: string, createCourseDto: CreateCourseDto, file: Express.Multer.File): Promise<Course> {
    const categogies_promise: Promise<Category>[] = createCourseDto.categories.map(async categoryId => {
      return this.categoriesService.findOne(categoryId)
    });
    const categories: Category[] = await Promise.all(categogies_promise);
  
    const course = {
      ...createCourseDto,
      userId,
      categories,
    }

    let newCourse = await this.coursesRepository.create(course);

    const filePath = `/home/node/files/${userId}/`;
    this.createFolder(filePath);
    
    newCourse = await this.coursesRepository.save(newCourse);
    const fileName = `${newCourse.id}.pdf`
    this.writeFile(filePath + fileName, file);
    return newCourse;
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

  writeFile(filePath: string, file: Express.Multer.File) {
    closeSync(openSync(filePath, 'w'));
    writeFileSync(filePath, file.buffer);
  }

  createFolder(path: string) {
    mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
}
