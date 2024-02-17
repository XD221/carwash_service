import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtenerInversionista = async () => {
  return await prisma.usuario.findMany({
    where: {
      role: "INVERSIONISTA",
    },
  })
}
