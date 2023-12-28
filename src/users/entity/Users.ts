import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  login: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;
}
