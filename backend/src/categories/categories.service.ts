import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto): void {
    this.categoriesRepository.save(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id: id } });
  }

  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }
}
