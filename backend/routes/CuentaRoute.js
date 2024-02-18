import { login } from "../query/CuentaQuery.js"
import jwt from "jsonwebtoken"

const getToken = (result) => {
  const { TOKEN_SECRETKEY } = process.env
  return jwt.sign(
    {
      id: result.id,
      username: result.username,
      role: result.role,
      nombre: result.persona.nombre,
      apellido: result.persona.apellido,
    },
    TOKEN_SECRETKEY,
    { expiresIn: "80m", algorithm: "HS256" }
  )
}

const CuentaRoute = (fastify, options, next) => {
  fastify.get("/login", async (request, reply) => {
    const { username, password } = request.query
    if (username && password) {
      try {
        const result = await login({ username, password })
        if (result) {
          const token = getToken(result)
          return reply.code(200).send({
            success: true,
            data: {
              username: result.username,
              role: result.role,
              nombre: result.nombre,
              apellido: result.apellido,
              token,
            },
          })
        }
        return reply
          .code(403)
          .send({ success: false, message: "Usuario o contraseña incorrecta." })
      } catch (error) {
        return reply.code(404).send({
          success: false,
          message: "No es posible comunicarse con la db.",
        })
      }
    }
    return reply.code(404).send({
      success: false,
      message:
        "No cuenta con los parámetros suficientes para realizar la consulta.",
    })
  })

  fastify.get("/authentication", async (request, reply) => {
    const auth = request.headers.authorization
    const token = auth.split(" ")[1]
    if (token) {
      const validateToken = verifyToken(token)
      if (validateToken.success) {
        const { username, role, nombre, apellido } = validateToken.data
        const current = new Date()
        const tokenDate = new Date(validateToken.exp * 1000)
        tokenDate.setMinutes(tokenDate.getMinutes() - 15)
        if (current.getTime() >= tokenDate.getTime()) {
          token = getToken(validateToken)
          return reply.code(200).send({
            success: true,
            data: { username, role, nombre, apellido, token },
          })
        }

        return reply.code(200).send({
          success: true,
          data: null,
        })
      } else {
        return reply
          .code(403)
          .send({ success: false, message: validateToken.message })
      }
    }
    return reply.code(404).send({
      success: false,
      message:
        "No cuenta con los parámetros suficientes para realizar la consulta.",
    })
  })

  next()
}

export const verifyToken = (token) => {
  try {
    const { TOKEN_SECRETKEY } = process.env
    const result = jwt.verify(token, TOKEN_SECRETKEY)
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return { success: false, message: "Token inválido." }
  }
}

export default CuentaRoute
