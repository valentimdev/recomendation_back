import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/User.Entity.js';
@Entity()
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ManyToOne(() => User)
  referrer!: User;

  @OneToOne(() => User)
  referred!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
