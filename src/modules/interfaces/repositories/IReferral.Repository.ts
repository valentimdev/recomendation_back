import { Referral } from "../../../referral/entities/Referal.Entity.js";

export interface IReferralRepository {
  save(referral: Referral): Promise<Referral>;
  findAll(): Promise<Referral[]>;
  findById(id: string): Promise<Referral | null>;
  update(referral: Referral): Promise<Referral>;
  delete(id: string): Promise<void>;
  findByReferrerId(userId: string): Promise<Referral[]>;
  findByReferredId(userId: string): Promise<Referral | null>;
}
