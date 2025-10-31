import { IReferralRepository } from '../interfaces/repositories/IReferral.Repository.js';
import { IUserRepository } from '../interfaces/repositories/IUser.Repository.js';
import {
  IUserService,
  CreateUserRequest,
} from '../interfaces/services/IUser.Service.js';
import { User } from './entities/User.Entity.js';
import { UserRepository } from './User.Repository.js';
import bcrypt from 'bcryptjs';
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly referralRepository: IReferralRepository
  ) {}
  async register(data: CreateUserRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);
    
    if (userExists) {
      throw new Error('Email ja existe');
    }
    const senhaHash = await bcrypt.hash(data.password, 8);

    const newUser = new User();
    newUser.name = data.name;
    newUser.password = data.password
    newUser.email = data.email
    newUser.referral=data.referral

    const usuarioSalvo = await this.userRepository.save(newUser)
    await this.referralService.ProcessReferralData({
            userIdQueFoiIndicado: usuarioSalvo.id,
            codigoDeQuemIndicou: data.referral
        });
  }
  async getUserProfile(userId: string): Promise<User> {}
}
