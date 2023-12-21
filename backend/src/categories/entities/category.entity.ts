import { Column, Entity, ManyToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Category {
  @Column({ primary: true, generated: 'uuid', type: 'uuid' })
  public id: string;

  @Column({ nullable: false, unique: true })
  public name: string;

  @ManyToMany(() => Course, (course: Course) => course.categories)
  @JoinTable({ name: 'course_category' })
  public courses: Course[];
}
