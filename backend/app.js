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
  
  /**
   * Run the server!
   */
  // try {
  //   await fastify.listen({ port: 3000 }, function (err, address) {
  //     if (err) {
  //       fastify.log.error(err)
  //       process.exit(1)
  //     }
  //     fastify.log.info(`server listening on ${address}`)
  //   })
  // } catch (err) {
  //   fastify.log.error(err)
  //   process.exit(1)
  // }
}