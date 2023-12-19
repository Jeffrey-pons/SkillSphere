import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ type: 'enum', enum: Role })
  public role: string;

  @Column({ type: 'enum', enum: Status })
  public status: string;

  @Column({ type: 'enum', enum: Level })
  public level: string;

  @Column({ type: 'varchar' })
  public password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public last_connexion: string;
}
