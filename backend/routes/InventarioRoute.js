import { obtenerInfoById } from "../query/CuentaQuery.js"
import {
  obtener,
  obtenerByProductoId,
  crear,
  suspender,
  habilitar,
  incrementarStock,
  decrementarStock,
} from "../query/InventarioQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const InventarioRoute = (fastify, options, next) => {
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
            const { sucursalId } = request.query
            if (typeof sucursalId === "string") {
              result = await obtener(sucursalId, id)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
            return reply.code(403).send({
              success: false,
              message:
                "No cuenta con los parámetros suficientes para realizar la consulta.",
            })
          } else if (role === "OPERADOR") {
            const info = await obtenerInfoById(id)
            if (info?.length > 0) {
              result = await obtener(info.sucursalId)
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
    const { productoId, cant_init } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (typeof productoId === "string" && typeof cant_init === "string") {
            const { id, role } = validateToken.data
            const exist = await obtenerByProductoId(productoId, "0", id)
            if (Array.isArray(exist) && exist?.length === 0) {
              let result = []
              if (role === "INVERSIONISTA") {
                const { sucursalId } = request.body // falta completar
                result = await crear(productoId, cant_init, sucursalId)
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              } else if (role === "OPERADOR") {
                const info = await obtenerInfoById(id)
                if (info?.length > 0) {
                  result = await crear(productoId, cant_init, info.sucursalId)
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
              return reply.code(403).send({
                success: false,
                message: "No cuenta con los permisos suficientes.",
              })
            }
            return reply.code(406).send({
              success: false,
              message: "Ya existe el producto en el inventario.",
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

  fastify.post("/incrementarStock", async (request, reply) => {
    const { productoId, cant_init } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (typeof productoId === "string" && typeof cant_init === "string") {
            const { id, role } = validateToken.data
            let sucursalId = null
            if (role === "INVERSIONISTA") {
              sucursalId = request.body.sucursalId
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                sucursalId = info.sucursalId
              } else {
                return reply.code(403).send({
                  success: false,
                  message: "Usuario no encontrado.",
                })
              }
            } else {
              return reply.code(403).send({
                success: false,
                message: "No cuenta con los permisos suficientes.",
              })
            }
            if (sucursalId === undefined && sucursalId === null) {
              return reply.code(406).send({
                success: false,
                message: "El ID de la sucursal es invalida.",
              })
            }
            const exist = await obtenerByProductoId(productoId, sucursalId)
            if (exist?.length > 0) {
              let result = []
              result = await incrementarStock(cant_init, productoId, sucursalId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
            return reply.code(406).send({
              success: false,
              message: "No existe el producto en el inventario.",
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

  fastify.post("/suspender", async (request, reply) => {
    const { id } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (id) {
            let result = []
            const { role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const { sucursalId } = request.body
              result = await suspender(id, sucursalId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                result = await suspender(id, info.sucursalId)
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

  fastify.post("/habilitar", async (request, reply) => {
    const { id } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (id) {
            let result = []
            const { role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const { sucursalId } = request.body
              result = await habilitar(id, sucursalId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                result = await habilitar(id, info.sucursalId)
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

  next()
}

export default InventarioRoute
