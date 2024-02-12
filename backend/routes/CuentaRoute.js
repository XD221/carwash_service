import { login } from '../query/CuentaQuery.js'

const CuentaRoute = (fastify, options, next) => {
    fastify.get('/login', async (request, reply) => {
        const { username, password } = request.query
        if(username && password) {
            try {
                const result = await login({ username, password })
                if(result) {
                    reply.code(200).send({ success: true, data: result })
                }
                reply.code(403).send({ success: false, message: 'Usuario o contraseña incorrecta.' })
            } catch (error) {
                reply.code(404).send({ success: false, message: 'No es posible comunicarse con la db.' })
            }
        }
        reply.code(404).send({ success: false, message: 'No cuenta con los parámetros suficiente para realizar la consulta.' })
    })
    next()
};

export default CuentaRoute