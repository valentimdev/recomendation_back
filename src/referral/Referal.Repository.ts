import { Repository } from 'typeorm';
import { IReferralRepository } from '../modules/interfaces/repositories/IReferral.Repository.js';
import { Referral } from './entities/Referal.Entity.js';
import { AppDataSource } from '../config/data-source.js';
export class ReferralRepository implements IReferralRepository {
  
  // A "ferramenta" real do TypeORM
  private ormRepository: Repository<Referral>;

  constructor() {
    // Pega o repositório da entidade Referral no construtor
    this.ormRepository = AppDataSource.getRepository(Referral);
  }

  async save(referral: Referral): Promise<Referral> {
    return this.ormRepository.save(referral);
  }

  async findAll(): Promise<Referral[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Referral | null> {
    return this.ormRepository.findOneBy({ id: id });
  }

  async update(referral: Referral): Promise<Referral> {
    return this.ormRepository.save(referral);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByReferrerId(userId: string): Promise<Referral[]> {

    return this.ormRepository.find({
      where: {
        referrer: { id: userId },
      },

    });
  }

  async findByReferredId(userId: string): Promise<Referral | null> {

    return this.ormRepository.findOne({
      where: {
        referred: { id: userId },
      },

    });
  }
}