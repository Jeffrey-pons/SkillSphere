import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './entities/course.entity';
import {Users} from "../users/entities/user.entity";
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), CategoriesModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
