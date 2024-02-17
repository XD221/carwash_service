import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async () => {
  return await prisma.persona.findMany()
}
