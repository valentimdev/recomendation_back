import Fastify from 'fastify'
import "reflect-metadata";
import { AppDataSource } from './config/data-source.js';
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
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