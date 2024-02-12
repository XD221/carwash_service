import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const login = async (data: { username: string, password: string }) => {
    const { username, password } = data
    const authorization = await prisma.usuario.findFirst({
        where: {
            username: username,
            password: password
        },
        select: {
            id: true,
            username: true,
            role: true,
            persona: {
                select: {
                    nombre: true,
                    apellido: true,
                }
            }
        }
    })

    if(authorization) {
        return authorization
    }
    return false
}