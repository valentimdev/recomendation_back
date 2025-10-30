import { IUserRepository } from '../interfaces/repositories/IUser.Repository.js';
import { IReferralRepository } from '../interfaces/repositories/IReferral.Repository.js';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source.js';
import { User } from './entities/User.Entity.js';
export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }
  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.ormRepository.findOneBy({ id: id });
  }

  async findByName(name: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { name: name } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email: email } });
  }

  async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async refCount(): Promise<number> {
    return this.ormRepository.count();
  }
}
