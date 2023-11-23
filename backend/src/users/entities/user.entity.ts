import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  mail: string;

  @Column({ type: 'enum', enum: ['user', 'admin'] })
  role: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date' })
  created_at: string;

  @Column({ type: 'date' })
  last_connexion: string;
}