import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;


  @Column({ type: 'varchar' }) 
  name!: string;
  

  @Column({ type: 'varchar' })
  password!:string;

  @Column({ type: 'varchar', unique: true }) 
  email!: string;


  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}