import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserRequest } from './dto/User.DTO.js';
import { UserRepository } from './User.Repository.js';
import { ReferralRepository } from '../../referral/Referal.Repository.js';
import { UserService } from './User.Service.js';
import { ReferralService } from '../../referral/Referal.Service.js';
import { IUserRepository } from './interfaces/IUser.Repository.js';
import { IReferralRepository } from '../../referral/interfaces/IReferral.Repository.js';

export async function userRoutes(fastify: FastifyInstance) {
  const userRepository : IUserRepository = new UserRepository();
  const referralRepository : IReferralRepository = new ReferralRepository();

  const referralService = new ReferralService(
    referralRepository,
    userRepository
  );
  const userService = new UserService(
    userRepository,
    referralRepository,
    referralService
  );

  fastify.post(
    '/users/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = request.body as CreateUserRequest;
        const novoUsuario = await userService.register(data);
        return reply.status(201).send(novoUsuario);
      } catch (error) {
        fastify.log.error(error);

        return reply.status(400).send({ message: (error as Error).message });
      }
    }
  );
  fastify.get('/users/scoreboard', async (request, reply) => {
    try {
      const placar = await userService.getLeaderboard();
      return reply.status(200).send(placar);
    } catch (error) {
      fastify.log.error(error);

      return reply.status(500).send({ message: (error as Error).message });
    }
  });
}
