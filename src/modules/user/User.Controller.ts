import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserRequest } from '../interfaces/services/IUser.Service.js';
import { UserRepository } from './User.Repository.js';
import { ReferralRepository } from '../../referral/Referal.Repository.js';
import { UserService } from './User.Service.js';
import { ReferralService } from '../../referral/Referal.Service.js';

export async function userRoutes(fastify: FastifyInstance) {
  


  const userRepository = new UserRepository();
  const referralRepository = new ReferralRepository();


  const referralService = new ReferralService(referralRepository, userRepository);
  const userService = new UserService(
    userRepository,
    referralRepository,
    referralService,
  );

  fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    

    try {
      const data = request.body as CreateUserRequest;
      const novoUsuario = await userService.register(data);
      return reply.status(201).send(novoUsuario);
    } catch (error) {
      

      fastify.log.error(error); 
      
      return reply.status(400).send({ message: (error as Error).message });
    }
  });


}