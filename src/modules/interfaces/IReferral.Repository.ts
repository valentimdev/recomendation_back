import { Referral } from "../referral/entities/Referral.Entity.js";


export interface IReferralRepository {
    save(produto: Referral): Promise<Referral>;
    findAll(): Promise<Referral[]>;
    findById(id: string): Promise<Referral | null>;
    findByNome(nome: string): Promise<Referral | null>; 
    update(produto: Referral): Promise<Referral>;
    delete(id: string): Promise<void>;
    refCount(): Promise<number>;
}