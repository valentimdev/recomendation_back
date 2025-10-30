import { User } from '../../user/entities/User.Entity.js';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByName(nome: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  refCount(): Promise<number>;
  findByEmail(email:string):Promise<User | null>;
}
