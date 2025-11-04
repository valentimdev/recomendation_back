import { FastifyInstance } from 'fastify';
import { AuthService } from './Auth.Service.js';
import { UserRepository } from '../user/User.Repository.js';
import { LoginRequest } from './dtos/Auth.DTO.js';
import { IUserRepository } from '../user/interfaces/IUser.Repository.js';
import { IAuthService } from './interfaces/IAuth.Service.js';

export async function authRoutes(fastify: FastifyInstance) {
  const userRepository : IUserRepository = new UserRepository();
  const authService : IAuthService = new AuthService(userRepository, fastify);
  fastify.post('/auth/login', async (request, reply) => {
    try {
      const data = request.body as LoginRequest;

      const response = await authService.login(data);

      return reply.status(200).send(response);
    } catch (error) {
      return reply.status(401).send({ message: (error as Error).message });
    }
  });
}
