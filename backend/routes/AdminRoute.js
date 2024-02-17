import { obtener } from "../query/AdminQuery"
import { verifyToken } from "./CuentaRoute"

const AdminRoute = (fastify, options, next) => {
  fastify.get("/obtener", async (request, reply) => {
    const { token } = request.query
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          return reply.code(200).send({
            success: true,
            data: await obtener(),
          })
        }
        return reply
          .code(401)
          .send({ success: false, message: "Acceso denegado." })
      } catch (error) {
        return reply.code(404).send({
          success: false,
          message: "Ocurrió un error inesperado, intente nuevamente.",
        })
      }
    }
    return reply.code(403).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
}

export default AdminRoute
