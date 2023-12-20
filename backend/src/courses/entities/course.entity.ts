import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
  @Column({ primary: true, generated: 'uuid' })
  public id: string;

  @Column({ nullable: false })
  public title: string;

  @ManyToOne(() => Users, (user) => user.courses)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user: Users;

  @Column({ type: 'uuid', nullable: false })
  public userId: string;

  @Column({ nullable: false, enum: FileStatus, default: FileStatus.EN_ATTENTE })
  public status: string;

  @Column({ nullable: false })
  public views: number;

  @Column({ nullable: false, enum: Level })
  public level: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
