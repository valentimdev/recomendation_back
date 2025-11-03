import { Int32 } from 'typeorm';
import { User } from '../../user/entities/User.Entity.js';
export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  referral: string;
}
export interface IUserService {
  register(data: CreateUserRequest): Promise<User>;
  getUserProfile(userId: string): Promise<User>;
}
