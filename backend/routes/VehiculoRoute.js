import {
  crearTarifa,
  obtenerTarifaTipoVehiculo,
  obtenerTipoVehiculo,
} from "../query/VehiculoQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const VehiculoRoute = (fastify, options, next) => {
  fastify.get("/obtener-tarifa-tipo-vehiculo", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          let result = []
          const { id, role } = validateToken.data
          if (role === "ADMIN") {
            result = await obtenerTarifaTipoVehiculo(null)
          } else if (role === "INVERSIONISTA") {
            result = await obtenerTarifaTipoVehiculo(id)
          } else {
            const info = await obtenerInfoById(id)
            if (info) {
              result = await obtenerTarifaTipoVehiculo(
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

  fastify.get("/obtener-tipo-vehiculo", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          const result = obtenerTipoVehiculo()
          return reply.code(200).send({
            success: true,
            data: result,
          })
        }
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

  fastify.post("/crear-tarifa", async (request, reply) => {
    const { tipoVehiculo, tarifa } = request.body
    // crearTarifa
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (tipoVehiculo && tarifa) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            const { id, role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const result = await crearTarifa(tipoVehiculo, tarifa, id)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
            return reply.code(404).send({
              success: false,
              message: "No cuenta con los permisos suficientes.",
            })
          }
          return reply.code(404).send({
            success: false,
            message: "No cuenta con los permisos suficientes.",
          })
        } catch (error) {
          return reply.code(404).send({
            success: false,
            message: "Ocurrió un error inesperado, intente nuevamente.",
          })
        }
      }
      return reply.code(403).send({
        success: false,
        message:
          "No cuenta con los parámetros suficientes para realizar la consulta.",
      })
    }
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
  next()
}

export default VehiculoRoute
