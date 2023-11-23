import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  pdf_path: string;
  @Column({ nullable: false, enum: ['Admin', 'Teacher', 'Student'] })
  status: string;
  @Column({ nullable: false })
  views: number;
  @Column({ nullable: false })
  level: string;
}
