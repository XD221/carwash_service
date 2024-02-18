import {
  crearInversionista,
  crearInversionista_personaExistente,
} from "../query/CuentaQuery.js"
import { obtener, obtenerById } from "../query/PersonaQuery.js"
import { verifyToken } from "./CuentaRoute.js"

const InversionistaRoute = (fastify, options, next) => {
  fastify.get("/obtener", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      try {
        const validateToken = verifyToken(token)
        if (validateToken.success) {
          const result = await obtener()
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
    return reply.code(403).send({
      success: false,
      message: "Acceso denegado.",
    })
  })
  // ? Usado cuando se selecciona a una persona existente
  fastify.get("/agregar-persona-existente", async (request, reply) => {
    const { id, password } = request.query
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (id && password) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
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
  fastify.get("/agregar", async (request, reply) => {
    const { ci, nombre, apellido, telefono, direccion, correo, password } =
      request.query
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      if (
        ci &&
        nombre &&
        apellido &&
        telefono &&
        direccion &&
        correo &&
        password
      ) {
        try {
          const validateToken = verifyToken(token)
          if (validateToken.success) {
            const persona = await obtener()
            const exist = persona.find((data) => data.ci === ci)
            if (!exist) {
              const result = await crearInversionista({
                ci,
                nombre,
                apellido,
                telefono,
                direccion,
                correo,
                password,
              })
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
              message: "Ya existe una persona con el mismo CI.",
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

export default InversionistaRoute
