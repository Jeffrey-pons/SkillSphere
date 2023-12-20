import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FileStatus } from '../enum/file-status';
import {Level} from "../../_shared/enum/level";
import {Category} from "../../categories/entities/category.entity";
import {Users} from "../../users/entities/user.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public title: string;

  @ManyToOne(() => Users, (user) => user.courses)
  public user: Users;

  @Column({ nullable: false, enum: FileStatus, default: FileStatus.EN_ATTENTE })
  public status: string;

  @Column({ nullable: false })
  public views: number;

  @Column({ nullable: false, enum: Level })
  public level: string;

  @ManyToOne(() => Category, (category) => category.courses)
  public category: Category

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;
}
