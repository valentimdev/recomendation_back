import { IReferralRepository } from '../modules/interfaces/repositories/IReferral.Repository.js';
import { IUserRepository } from '../modules/interfaces/repositories/IUser.Repository.js';
import {
  IReferralService,
  ReferralDashboard,
  ProcessReferralData,
} from '../modules/interfaces/services/IReferral.Service.js';
import { User } from '../modules/user/entities/User.Entity.js';
import { Referral } from './entities/Referal.Entity.js';
export class ReferralService implements IReferralService {
  constructor(
    private readonly referralRepository: IReferralRepository,
    private readonly userRepository: IUserRepository
) {}
  async processRegistration(data: ProcessReferralData): Promise<void> {
    if (data.userReferred == null) {
      return;
    }
    const newRef = new Referral();
    newRef.referred = data.userReferred;
    newRef.referrer = data.userReferrer;
    this.referralRepository.save(newRef);
  }
  async getReferralNumberForUser(userId: string): Promise<Number> {
    const retorno = await this.referralRepository.findByReferrerId(userId);
    return retorno.length;
  }
}
