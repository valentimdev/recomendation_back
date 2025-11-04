import Fastify from 'fastify'
import "reflect-metadata";
import { AppDataSource } from './config/data-source.js';
import { userRoutes } from './modules/user/User.Controller.js';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { authRoutes } from './modules/auth/Auth.Controller.js';
const fastify = Fastify({
  logger: true
})

dotenv.config()

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(userRoutes);
fastify.register(authRoutes)
fastify.register(fastifyJwt,{
  secret:process.env.JWT_SECRET!,

})
const start = async () => {
  try {
    await AppDataSource.initialize();
    fastify.log.info("Data Source inicializado com sucesso!");
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()