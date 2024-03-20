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
  fastify.register(import("./routes/InversionistaRoute.js"), {
    prefix: "/inversionista",
  })
  fastify.register(import("./routes/PersonaRoute.js"), {
    prefix: "/persona",
  })
  fastify.register(import("./routes/VehiculoRoute.js"), {
    prefix: "/vehiculo",
  })
  fastify.register(import("./routes/ServiciosRoute.js"), {
    prefix: "/servicios",
  })
  fastify.register(import("./routes/SucursalesRoute.js"), {
    prefix: "/sucursales",
  })
  fastify.register(import("./routes/ProductosRoute.js"), {
    prefix: "/productos",
  })
  fastify.register(import("./routes/InventarioRoute.js"), {
    prefix: "/inventario",
  })

  // Configure the server!
  fastify.register(import("@fastify/cors"))
}
