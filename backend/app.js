// Import the framework and instantiate it
const { CONNECTION_HOST, CONNECTION_PORT } = process.env

export default async function (fastify, opts) {
  /**
   * Declare routes!
   */
  fastify.addHook('preHandler', (req, reply, done) => {
    reply.header('Content-Type', 'application/json; charset=utf-8')
    done()
  })
  fastify.register(import('./routes/CuentaRoute.js'), { prefix: '/cuenta' })
  
}