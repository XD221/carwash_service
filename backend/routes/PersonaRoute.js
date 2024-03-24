import { obtenerInfoById } from "../query/CuentaQuery.js"
import {
  obtener,
  crear,
  buscarNoInversionista,
  obtenerByCI,
  modificar,
} from "../query/PersonaQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const PersonaRoute = (fastify, options, next) => {
  fastify.get("/obtener", async (request, reply) => {
    let { nombre, apellido, ci, telefono } = request.query
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          let result = []
          if (typeof nombre !== "string") {
            nombre = nombre?.toString() ?? ""
          }
          if (typeof apellido !== "string") {
            apellido = apellido?.toString() ?? ""
          }
          if (typeof ci !== "string") {
            ci = ci?.toString() ?? ""
          }
          if (typeof telefono !== "string") {
            telefono = telefono?.toString() ?? ""
          }
          const { id, role } = validateToken.data
          if (role === "ADMIN") {
            result = await obtener(null)
          } else if (role === "INVERSIONISTA") {
            result = await obtener(nombre, apellido, ci, telefono, id)
          } else {
            const info = await obtenerInfoById(id)
            if (info?.length > 0) {
              result = await obtener(
                nombre,
                apellido,
                ci,
                telefono,
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
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })

  fastify.post("/agregar", async (request, reply) => {
    const { nombre, apellido, telefono, ci, correo, direccion } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (
            typeof nombre === "string" &&
            typeof apellido === "string" &&
            typeof telefono === "string" &&
            typeof ci === "string" &&
            typeof correo === "string" &&
            typeof direccion === "string"
          ) {
            let propietarioId = undefined
            const { id, role } = validateToken.data
            if (role === "ADMIN") {
              propietarioId = null
            } else if (role === "INVERSIONISTA") {
              propietarioId = id
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                propietarioId = info.persona.propietarioId
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
            const exist = await obtenerByCI(ci, "0", propietarioId)
            if (!exist) {
              const result = await crear(
                nombre,
                apellido,
                telefono,
                ci,
                correo,
                direccion,
                propietarioId
              )
              return reply.code(200).send({
                success: true,
                data: result,
              })
            }
            return reply.code(406).send({
              success: false,
              message: "Ya existe un persona con el mismo CI.",
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
    const { nombre, apellido, telefono, ci, correo, direccion, id } =
      request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (
            typeof nombre === "string" &&
            typeof apellido === "string" &&
            typeof telefono === "string" &&
            typeof ci === "string" &&
            typeof correo === "string" &&
            typeof direccion === "string" &&
            id
          ) {
            let propietarioId = undefined
            const { id: proId, role } = validateToken.data
            if (role === "ADMIN") {
              propietarioId = null
            } else if (role === "INVERSIONISTA") {
              propietarioId = proId
            } else if (role === "OPERADOR") {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
                propietarioId = info.persona.propietarioId
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
            const exist = await obtenerByCI(ci, id, propietarioId)
            if (!exist) {
              const result = await modificar(
                nombre,
                apellido,
                telefono,
                ci,
                correo,
                direccion,
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
              message: "Ya existe un persona con el mismo CI.",
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

  // ? Usando para listar personas que no son inversionistas (en uso en agregar inversionista)
  fastify.get("/buscar-no-inversionista", async (request, reply) => {
    const { nombre, apellido, ci, telefono } = request.query
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (
            typeof nombre === "string" &&
            typeof apellido === "string" &&
            typeof ci === "string" &&
            typeof telefono === "string"
          ) {
            let result = []
            const { id, role } = validateToken.data
            if (role === "ADMIN") {
              result = await buscarNoInversionista(nombre, apellido, ci, null)
            } else if (role === "INVERSIONISTA") {
              result = await buscarNoInversionista(nombre, apellido, ci, id)
            } else {
              const info = await obtenerInfoById(id)
              if (info?.length > 0) {
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
      message: "Acceso denegado.",
    })
  })
  next()
}

export default PersonaRoute
