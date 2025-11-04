import { Int32 } from 'typeorm';
import { User } from '../entities/User.Entity.js';
import { CreateUserRequest } from '../dto/User.DTO.js';

export type UserScoreboard = {
  email: string;
  referralPoints: number;
};
export interface IUserService {
  register(data: CreateUserRequest): Promise<User>;
  getUserProfile(userId: string): Promise<User>;
  getLeaderboard(): Promise<UserScoreboard[]>;
}
