// Import the framework and instantiate it
const { CONNECTION_HOST, CONNECTION_PORT } = process.env

export default async function (fastify, opts) {
  /**
   * Declare routes!
   */
  fastify.addHook("preHandler", (req, reply, done) => {
    reply.headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
    })
    done()
  })
  fastify.register(import("./routes/CuentaRoute.js"), { prefix: "/cuenta" })

  // Configure the server!
  fastify.register(import("@fastify/cors"))
}
