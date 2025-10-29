import { User } from "../user/entities/User.Entity.js";


export interface IUserRepository {
    save(produto: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByName(nome: string): Promise<User | null>; 
    update(produto: User): Promise<User>;
    delete(id: string): Promise<void>;
    refCount(): Promise<number>;
}