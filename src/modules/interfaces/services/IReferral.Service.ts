import { Int32 } from 'typeorm';
import { Referral } from '../../referral/entities/Referral.Entity.js';
import { User } from '../../user/entities/User.Entity.js';
export type ReferralDashboard = {

  meuCodigo: string;
  totalIndicados: number; 
}

export type ProcessReferralData = {
  userIdQueFoiIndicado: string;
  userIdQueFoiIndicou: string;
  codigoDeQuemIndicou?: string; 
}
export interface IReferralRepository {
    processRegistration(data: ProcessReferralData): Promise<void>;
    getReferralNumberForUser(userId: string): Promise<ReferralDashboard>;

}
