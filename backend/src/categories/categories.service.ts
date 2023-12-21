import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id: id } });
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }

  async findByCriteria(criteria: string): Promise<Category[]> {
    const categories: Category[] = await this.findAll();
    return categories.filter((category: Category) => {
      return (
        !criteria ||
        category.name.toLowerCase().includes(criteria.toLowerCase())
      );
    });
  }
}
