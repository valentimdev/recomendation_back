import { User } from "../../user/entities/User.Entity.js";

export type ReferralDashboard = {

  totalIndicados: number; 
}

export type ProcessReferralData = {
  userReferrer: User;
  userReferred: User;
  refCode?: string; 
}
export interface IReferralService {
    processRegistration(data: ProcessReferralData): Promise<void>;
    getReferralNumberForUser(userId: string): Promise<Number>;

}
