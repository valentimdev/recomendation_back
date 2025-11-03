export type ReferralDashboard = {

  meuCodigo: string;
  totalIndicados: number; 
}

export type ProcessReferralData = {
  userIdReferrer: string;
  userIdReferred: string;
  codigoDeQuemIndicou?: string; 
}
export interface IReferralService {
    processRegistration(data: ProcessReferralData): Promise<void>;
    getReferralNumberForUser(userId: string): Promise<ReferralDashboard>;

}
