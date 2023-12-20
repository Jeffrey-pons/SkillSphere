import { Column, Entity, OneToMany } from 'typeorm';
import { Level } from 'src/_shared/enum/level';
import { Status } from '../enum/status';
import { Course } from '../../courses/entities/course.entity';
import { Roles } from '../enum/roles';

@Entity()
export class Users {
  @Column({ primary: true, generated: 'uuid' })
  public id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  public username: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  public mail: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  public role: Roles;

  @Column({ type: 'enum', enum: Status, nullable: true })
  public status: Status;

  @Column({ type: 'enum', enum: Level, nullable: true })
  public level: Level;

  @Column({ type: 'varchar' })
  public password: string;

  @OneToMany(() => Course, (cours) => cours.user)
  public courses: Course[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public last_connexion: Date;
}
