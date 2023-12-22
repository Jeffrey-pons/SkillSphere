import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { FileStatus } from '../enum/file-status';
import { Level } from '../../_shared/enum/level';
import { Users } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Course {
  @Column({ primary: true, generated: 'uuid', type: 'uuid' })
  public id: string;

  @Column({ nullable: false })
  public title: string;

  @ManyToOne(() => Users, (user) => user.courses)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user: Users;

  @Column({ type: 'uuid', nullable: false, generated: 'uuid' })
  public userId: string;

  @Column({ nullable: false, enum: FileStatus, default: FileStatus.EN_ATTENTE })
  public status: string;

  @Column({ nullable: false, default: 0 })
  public views: number;

  @Column({ nullable: false, enum: Level })
  public level: string;

  @Column({ nullable: false })
  public description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ManyToOne(() => Category, (category: Category) => category.courses)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  public category: Category;

  @Column({ type: 'uuid', nullable: false, generated: 'uuid' })
  public categoryId: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
