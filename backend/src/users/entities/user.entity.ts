import { Column, Entity } from 'typeorm';
import { Role } from '../enum/roles';
import { Level } from 'src/_shared/enum/level';
import { Status } from '../enum/status';

@Entity()
export class Users {
  @Column({ primary: true, generated: 'uuid' })
  public id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  public username: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  public mail: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  public role: string;

  @Column({ type: 'enum', enum: Status, nullable: true })
  public status: string;

  @Column({ type: 'enum', enum: Level, nullable: true })
  public level: string;

  @Column({ type: 'varchar' })
  public password: string;

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
