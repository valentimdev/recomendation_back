import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import {User} from "../../user/entities/usuario.entity.js"
@Entity()
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id!: number;
  
    @ManyToOne(() => User)
    referrer!: User


    @OneToOne(() => User)
    referred!: User

    @CreateDateColumn()
    createdAt!: Date
}
