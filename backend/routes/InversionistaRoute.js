import {
  crearInversionista,
  crearInversionista_personaExistente,
  obtenerInfoById,
} from "../query/CuentaQuery.js"
import { obtener, obtenerById } from "../query/PersonaQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const InversionistaRoute = (fastify, options, next) => {
  // ? Usado cuando se selecciona a una persona existente
  fastify.post("/agregar-persona-existente", async (request, reply) => {
    const { id, password } = request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (id && password) {
            const { role } = validateToken.data
            if (role === "ADMIN") {
              const persona = await obtenerById(id)
              if (persona) {
                const result = await crearInversionista_personaExistente(
                  persona.id,
                  persona.ci,
                  password
                )
                if (result) {
                  return reply.code(200).send({
                    success: true,
                    data: result,
                  })
                }
                return reply.code(409).send({
                  success: false,
                  message:
                    "No es posible crear al usuario, ocurrió un error inesperado.",
                })
              }
              return reply.code(403).send({
                success: false,
                message: "No se encontró a la persona.",
              })
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
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
  fastify.post("/agregar", async (request, reply) => {
    const { ci, nombre, apellido, telefono, direccion, correo, password } =
      request.body
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          if (
            typeof ci === "string" &&
            typeof nombre === "string" &&
            typeof apellido === "string" &&
            typeof telefono === "string" &&
            typeof direccion === "string" &&
            typeof correo === "string" &&
            typeof password === "string"
          ) {
            const { role } = validateToken.data
            if (role === "ADMIN") {
              const persona = await obtener(null)
              const exist = await persona.find((data) => data.ci === ci)
              if (Array.isArray(exist) && exist?.length === 0) {
                const result = await crearInversionista({
                  ci,
                  nombre,
                  apellido,
                  telefono,
                  direccion,
                  correo,
                  password,
                  propietarioId: null,
                })
                return reply.code(200).send({
                  success: true,
                  data: result,
                })
              }
              return reply.code(403).send({
                success: false,
                message: "Ya existe una persona con el mismo CI.",
              })
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
    return reply.code(401).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
  next()
}

export default InversionistaRoute
