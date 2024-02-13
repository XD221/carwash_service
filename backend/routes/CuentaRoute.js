import { login } from '../query/CuentaQuery.js'
import { sign, verify } from 'jsonwebtoken'

const CuentaRoute = (fastify, options, next) => {
    fastify.get('/login', async (request, reply) => {
        const { username, password } = request.query
        if(username && password) {
            try {
                const result = await login({ username, password })
                if(result) {
                    const { TOKEN_SECRETKEY } = process.env
                    const token = sign({ id: result.id, username: result.username, role: result.role, nombre: result.persona.nombre, apellido: result.persona.apellido }, TOKEN_SECRETKEY, { expiresIn: '1h', algorithm: 'RS256' })
                    reply.code(200).send({ success: true, data: token })
                }
                reply.code(403).send({ success: false, message: 'Usuario o contraseña incorrecta.' })
            } catch (error) {
                reply.code(404).send({ success: false, message: 'No es posible comunicarse con la db.' })
            }
        }
        reply.code(404).send({ success: false, message: 'No cuenta con los parámetros suficientes para realizar la consulta.' })
    })

    fastify.get('/authentication', async (request, reply) => {
        const { token } = request.query
        if(token) {
            try {
                const { TOKEN_SECRETKEY } = process.env
                const result = verify(token, TOKEN_SECRETKEY)
                const { username, role, nombre, apellido } = result
                reply.code(200).send({ success: true, data: { username, role, nombre, apellido } })
            } catch (error) {
                reply.code(403).send({ success: false, message: 'Token inválido.' })
            }
        }
        reply.code(404).send({ success: false, message: 'No cuenta con los parámetros suficientes para realizar la consulta.' })
    })
    next()
};

export default CuentaRoute