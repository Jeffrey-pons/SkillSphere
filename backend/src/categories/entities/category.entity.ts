import { Column, Entity, ManyToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Category {
  @Column({ primary: true, generated: 'uuid' })
  id: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];
}
