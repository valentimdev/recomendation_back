import { IUserRepository } from '../user/interfaces/IUser.Repository.js';
import { IAuthService } from './interfaces/IAuth.Service.js';
import { LoginRequest, LoginResponse } from './dtos/Auth.DTO.js';
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify'
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly app: FastifyInstance
  ) {}
  async login(data: LoginRequest): Promise<LoginResponse> {
    const usuarioCheck = await this.userRepository.findByEmail(data.email);
    if (!usuarioCheck) {
      throw new Error('E-mail ou senha inválidos.');
    }
    const passwordMatch = await bcrypt.compare(
      data.password,
      usuarioCheck.password
    );
    if (!passwordMatch) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const token = await this.app.jwt.sign(
    {
      id: usuarioCheck.id,
      email: usuarioCheck.email,
    },
    {
      expiresIn: "1d", 
    }
  );

  return{
    jwtToken:token,
  }

  }
}
