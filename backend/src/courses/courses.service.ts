import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  writeFileSync,
  closeSync,
  openSync,
  mkdir,
  readFileSync,
  unlinkSync,
} from 'fs';
import { CategoriesService } from 'src/categories/categories.service';
import { FileStatus } from './enum/file-status';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private categoriesService: CategoriesService,
  ) {}

  async create(
    userId: string,
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const course = {
      ...createCourseDto,
      userId,
    };

    let newCourse = this.coursesRepository.create(course);

    const filePath = `/home/node/files/${userId}/`;
    this.createFolder(filePath);

    newCourse = await this.coursesRepository.save(newCourse);
    const fileName = `${newCourse.id}.pdf`;
    this.writeFile(filePath + fileName, file);

    return newCourse;
  }

  async findAll(): Promise<any[]> {
    const courses: Course[] = await this.coursesRepository.find();
    const coursesWithFile = [];
    courses.forEach((cours: Course) => {
      const filePath: string = `/home/node/files/${cours.userId}/${cours.id}.pdf`;
      const file: string = this.readFileBase64(filePath);
      coursesWithFile.push({ ...cours, file: file });
    });
    return coursesWithFile;
  }

  async findOne(id: string): Promise<Course & { file: string }> {
    const course: Course = await this.coursesRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
    const filePath = `/home/node/files/${course.userId}/${course.id}.pdf`;

    const file: string = this.readFileBase64(filePath);
    return {
      ...course,
      file: file,
    };
  }

  update(
    id: string,
    updateCourseDto: UpdateCourseDto,
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
    const filePath: string = `/home/node/files/${updateCourseDto.user_id}/${id}.pdf`;
    this.writeFile(filePath, file);
    return this.coursesRepository.update(id, updateCourseDto);
  }

  remove(course: Course): Promise<DeleteResult> {
    unlinkSync(`/home/node/files/${course.userId}/${course.id}.pdf`);
    return this.coursesRepository.delete(course.id);
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

  updateStatus(id: string, newStatus: FileStatus): Promise<UpdateResult> {
    return this.coursesRepository.update(id, { status: newStatus });
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

  readFileBase64(filePath: string): string {
    return readFileSync(filePath, 'base64');
  }
}
