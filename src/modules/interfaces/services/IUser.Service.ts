import { Int32 } from 'typeorm';
import { User } from '../../user/entities/User.Entity.js';
export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  referralCodeUsed?: string;
}
export type UserScoreboard={
  email:string;
  referralPoints:number;
}
export interface IUserService {
  register(data: CreateUserRequest): Promise<User>;
  getUserProfile(userId: string): Promise<User>;
  getLeaderboard(): Promise<UserScoreboard[]>
}
