import { IReferralRepository } from '../../referral/interfaces/IReferral.Repository.js';
import { IUserRepository } from './interfaces/IUser.Repository.js';
import { IReferralService } from '../../referral/interfaces/IReferral.Service.js';
import {
  IUserService,
  UserScoreboard,
} from './interfaces/IUser.Service.js';
import { User } from './entities/User.Entity.js';
import { CreateUserRequest } from './dto/User.DTO.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../services/EmailService.js';
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
    sendEmail({
      to: usuarioSalvo.email,
      subject: 'Bem-vindo(a) ao Nosso App!',
      body: `<h1>Olá, ${usuarioSalvo.name}!</h1><p>Seu registro foi concluído com sucesso.</p>`,
    }).catch((err) =>
      console.error('Falha ao enviar e-mail de boas-vindas:', err)
    );
    if (data.referralCodeUsed) {
      const userReferrer = await this.userRepository.findById(
        data.referralCodeUsed
      );
      if (userReferrer) {
        await this.referralService.processRegistration({
          userReferred: usuarioSalvo,
          userReferrer: userReferrer,
        });
        sendEmail({
          to: userReferrer.email,
          subject: 'Você recebeu um ponto de indicação!',
          body: `<h1>Parabéns, ${userReferrer.name}!</h1><p>O usuário <b>${usuarioSalvo.name}</b> acabou de se registrar usando seu código de indicação.</p>`,
        }).catch((err) =>
          console.error(
            'Falha ao enviar e-mail de notificação de indicação:',
            err
          )
        );
      }
    }
    return usuarioSalvo;
  }
  async getUserProfile(userId: string): Promise<User> {
    const userRetorno = await this.userRepository.findById(userId);

    if (!userRetorno) {
      throw new Error('Usuário não encontrado.');
    }

    return userRetorno;
  }
  async getLeaderboard(): Promise<UserScoreboard[]> {
    const pointsList = await this.referralRepository.getReferralPointsByUsers();
    if (!pointsList) {
      return [];
    }
    const finalReturn: UserScoreboard[] = [];
    for (const pointItem of pointsList) {
      const user = await this.userRepository.findById(pointItem.userId);
      const referralPointsReturn = pointItem.points;
      if (!user) {
        continue;
      }
      const userScore = {
        email: user.email,
        referralPoints: referralPointsReturn,
      };
      finalReturn.push(userScore);
    }
    return finalReturn;
  }
}
