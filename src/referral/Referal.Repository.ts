import { Repository } from 'typeorm';
import { IReferralRepository } from '../modules/interfaces/repositories/IReferral.Repository.js';
import { Referral } from './entities/Referal.Entity.js';
import { AppDataSource } from '../config/data-source.js';
export class ReferralRepository implements IReferralRepository {
  

  private ormRepository: Repository<Referral>;

  constructor() {
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
  async getReferralPointsByUsers(): Promise<{ userId: string; points: number }[]> {
        return this.ormRepository.createQueryBuilder('referral')
            .select('referral.referrerId', 'userId') // Seleciona o ID do indicador
            .addSelect('COUNT(*)', 'points')          // Conta quantos registros existem
            .groupBy('referral.referrerId')           // Agrupa por indicador
            .orderBy('points', 'DESC')
            .limit(10) //limitar pra 10
            .getRawMany(); // getRawMany retorna os dados brutos (userId e points)
    }
}
