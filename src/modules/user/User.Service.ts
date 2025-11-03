import { IReferralRepository } from '../interfaces/repositories/IReferral.Repository.js';
import { IUserRepository } from '../interfaces/repositories/IUser.Repository.js';
import { IReferralService } from '../interfaces/services/IReferral.Service.js';
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
    private readonly referralRepository: IReferralRepository,
    private readonly referralService: IReferralService
  ) {}

  async register(data: CreateUserRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('Email ja existe');
    }
    const senhaHash = await bcrypt.hash(data.password, 8);

    const newUser = new User();
    newUser.name = data.name;
    newUser.password = senhaHash;
    newUser.email = data.email;

    const usuarioSalvo = await this.userRepository.save(newUser);
    if (data.referralCodeUsed) {
      const userReferrer = await this.userRepository.findById(
        data.referralCodeUsed
      );
      if (userReferrer) {
        await this.referralService.processRegistration({
          userReferred: usuarioSalvo,
          userReferrer: userReferrer,
        });
      }
    }
    return newUser;
  }
  async getUserProfile(userId: string): Promise<User> {

    const userRetorno = await this.userRepository.findById(userId);

    if (!userRetorno) {
      throw new Error("Usuário não encontrado.");
    }

    return userRetorno;
  }

}
