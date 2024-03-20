import { obtenerInfoById } from "../query/CuentaQuery.js"
import {
  obtener,
  obtenerByNombre,
  crear,
  modificar,
} from "../query/ProductosQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const ProductosRoute = (fastify, options, next) => {
  fastify.get("/obtener", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          let result = []
          const { id, role } = validateToken.data
          if (role === "INVERSIONISTA") {
            result = await obtener(id)
            return reply.code(200).send({
              success: true,
              data: result,
            })
          } else if (role === "OPERADOR") {
            const info = await obtenerInfoById(id)
            if (info?.length > 0) {
              result = await obtener(info.persona.propietarioId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            } else {
              return reply.code(403).send({
                success: false,
                message: "Usuario no encontrado.",
              })
            }
          }
        }
        return reply.code(403).send({
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
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })

  fastify.post("/agregar", async (request, reply) => {
    const { nombre, precio } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (typeof nombre === "string" && typeof precio === "string") {
            const { id, role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const exist = await obtenerByNombre(nombre, "0", id)
              if (Array.isArray(exist) && exist?.length === 0) {
                const result = await crear(nombre, precio, id)
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              }
              return reply.code(406).send({
                success: false,
                message: "Ya existe un producto con ese nombre.",
              })
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                result = await obtenerPersona(info.persona.propietarioId)
                result = await crear(nombre, precio, info.persona.propietarioId)
              } else {
                return reply.code(403).send({
                  success: false,
                  message: "Usuario no encontrado.",
                })
              }
            }
            return reply.code(403).send({
              success: false,
              message: "No cuenta con los permisos suficientes.",
            })
          }
          return reply.code(403).send({
            success: false,
            message:
              "No cuenta con los parámetros suficientes para realizar la consulta.",
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

  fastify.post("/modificar", async (request, reply) => {
    const { nombre, precio, id } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (typeof nombre === "string" && typeof precio === "string" && id) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            if (
              typeof nombre === "string" &&
              typeof precio === "string" &&
              id
            ) {
              let result = []
              const { id: propietarioId, role } = validateToken.data
              if (role === "INVERSIONISTA") {
                const exist = await obtenerByNombre(nombre, id, propietarioId)
                if (Array.isArray(exist) && exist?.length === 0) {
                  result = await modificar(nombre, precio, id, propietarioId)
                  return reply.code(200).send({
                    success: true,
                    data: result,
                  })
                }
                return reply.code(406).send({
                  success: false,
                  message: "Ya existe un producto con ese nombre.",
                })
              } else if (role === "OPERADOR") {
                const info = await obtenerInfoById(id)
                if (info?.length > 0) {
                  result = await obtenerPersona(info.persona.propietarioId)
                  result = await modificar(
                    nombre,
                    precio,
                    id,
                    info.persona.propietarioId
                  )
                } else {
                  return reply.code(403).send({
                    success: false,
                    message: "Usuario no encontrado.",
                  })
                }
              }
            }
            return reply.code(403).send({
              success: false,
              message:
                "No cuenta con los parámetros suficientes para realizar la consulta.",
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

export default ProductosRoute
