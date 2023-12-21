import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Category {
  @Column({ primary: true, generated: 'uuid', type: 'uuid' })
  public id: string;

  @Column({ nullable: false, unique: true })
  public name: string;

  @OneToMany(() => Course, (course: Course) => course.category)
  public courses: Course[];
}
