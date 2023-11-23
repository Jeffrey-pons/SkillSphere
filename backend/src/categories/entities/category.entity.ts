import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  name: string;
  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];
}
