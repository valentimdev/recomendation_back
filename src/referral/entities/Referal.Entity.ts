import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column
} from 'typeorm';
import { User } from '../../modules/user/entities/User.Entity.js';
@Entity()
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  referrer!: User;

  @OneToOne(() => User)
  @JoinColumn()
  referred!: User;
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
