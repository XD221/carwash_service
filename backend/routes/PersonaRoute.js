import { obtenerInfoById } from "../query/CuentaQuery.js"
import { obtener, buscarNoInversionista } from "../query/PersonaQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const PersonaRoute = (fastify, options, next) => {
  fastify.get("/obtener", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          let result = []
          const { id, role } = validateToken.data
          if (role === "ADMIN") {
            result = await obtener(null)
          } else if (role === "INVERSIONISTA") {
            result = await obtener(id)
          } else {
            const info = await obtenerInfoById(id)
            if (info) {
              result = await obtener(info.persona.propietarioId)
            } else {
              return reply.code(403).send({
                success: false,
                message: "Usuario no encontrado.",
              })
            }
          }
          return reply.code(200).send({
            success: true,
            data: result,
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
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
  // ? Usando para listar personas que no son inversionistas (en uso en agregar inversionista)
  fastify.get("/buscar-no-inversionista", async (request, reply) => {
    const { nombre, apellido, ci, telefono } = request.query
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          let result = []
          const { id, role } = validateToken.data
          if (role === "ADMIN") {
            result = await buscarNoInversionista(nombre, apellido, ci, null)
          } else if (role === "INVERSIONISTA") {
            result = await buscarNoInversionista(nombre, apellido, ci, id)
          } else {
            const info = await obtenerInfoById(id)
            if (info) {
              result = await buscarNoInversionista(
                nombre,
                apellido,
                ci,
                info.persona.propietarioId
              )
            } else {
              return reply.code(403).send({
                success: false,
                message: "Usuario no encontrado.",
              })
            }
          }
          return reply.code(200).send({
            success: true,
            data:
              telefono?.length > 0
                ? result?.filter((data) =>
                    data.telefono.toString().includes(telefono)
                  )
                : result,
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
  next()
}

export default PersonaRoute
