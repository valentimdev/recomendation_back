import { IReferralRepository } from "../modules/interfaces/repositories/IReferral.Repository.js";
import { IReferralService, ReferralDashboard,ProcessReferralData } from "../modules/interfaces/services/IReferral.Service.js";
export class ReferralService implements IReferralService{
      constructor(
        private readonly referralRepository: IReferralRepository
      ) {}
    async processRegistration (params:ProcessReferralData): Promise<void> {
        return null;
    }
    async getReferralNumberForUser(userId:string): Promise<ReferralDashboard> {
        return null;
    }
}