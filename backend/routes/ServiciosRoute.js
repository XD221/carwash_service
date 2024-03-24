import { obtenerInfoById } from "../query/CuentaQuery.js"
import {
  obtener,
  obtenerByNombre,
  crear,
  modificar,
  obtenerServiciosSucursal,
  obtenerServiciosSucursalById,
  agregarServicioSucursal,
  suspender,
  habilitar,
} from "../query/ServiciosQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const ServiciosRoute = (fastify, options, next) => {
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
          }
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

  fastify.get("/obtenerServiciosSucursal", async (request, reply) => {
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
            result = await obtenerServiciosSucursal(sucursalId, id)
            return reply.code(200).send({
              success: true,
              data: result,
            })
          }
        } else if (role === "OPERADOR") {
          const info = await obtenerInfoById(id)
          if (info?.length > 0) {
            result = await obtenerServiciosSucursal(
              info.sucursalId,
              info.persona.propietarioId
            )
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
    const { nombre, precio, descripcion } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (
        typeof nombre === "string" &&
        typeof precio === "string" &&
        typeof descripcion === "string"
      ) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            let result = []
            const { id, role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const exist = await obtenerByNombre(nombre, 0, id)
              if (Array.isArray(exist) && exist?.length === 0) {
                result = await crear(nombre, precio, descripcion, id)
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              }
              return reply.code(406).send({
                success: false,
                message: "Ya existe un servicio con ese nombre.",
              })
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

  fastify.post("/modificar", async (request, reply) => {
    const { nombre, precio, descripcion, id } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (
        typeof nombre === "string" &&
        typeof precio === "string" &&
        typeof descripcion === "string" &&
        id
      ) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            let result = []
            const { id: propietarioId, role } = validateToken.data
            if (role === "INVERSIONISTA") {
              const exist = await obtenerByNombre(nombre, id, propietarioId)
              if (Array.isArray(exist) && exist?.length === 0) {
                result = await modificar(
                  nombre,
                  precio,
                  descripcion,
                  id,
                  propietarioId
                )
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              }
              return reply.code(406).send({
                success: false,
                message: "Ya existe un servicio con ese nombre.",
              })
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

  fastify.post("/agregarServicioSucursal", async (request, reply) => {
    const { servicioId, sucursalId } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (typeof servicioId === "string" && typeof sucursalId === "string") {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            let result = []
            const { role } = validateToken.data
            if (role === "INVERSIONISTA") {
              // ? FindFirst, only object
              const exist = await obtenerServiciosSucursalById(
                servicioId,
                sucursalId
              )
              if (!exist) {
                result = await agregarServicioSucursal(servicioId, sucursalId)
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              }
              return reply.code(406).send({
                success: false,
                message: "Ya existe el mismo servicio en la sucursal.",
              })
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

  fastify.post("/suspender", async (request, reply) => {
    const { sucursalId, servicioId } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (sucursalId && servicioId) {
            let result = []
            const { role } = validateToken.data
            if (role === "INVERSIONISTA") {
              result = await suspender(sucursalId, servicioId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
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
    const { sucursalId, servicioId } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (sucursalId && servicioId) {
            let result = []
            const { role } = validateToken.data
            if (role === "INVERSIONISTA") {
              result = await habilitar(sucursalId, servicioId)
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
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
  fastify.post("/prueba", async (request, reply) => {
    const { sucursalId, servicioId } = request.body
    const result = await obtenerServiciosSucursalById(servicioId, sucursalId)
    return reply.code(200).send({
      success: true,
      message: result,
    })
  })
}

export default ServiciosRoute
