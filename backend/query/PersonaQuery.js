import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (propietarioId) => {
  return await prisma.persona.findMany({
    where: {
      propietarioId: {
        equals: propietarioId ? Number(propietarioId) : null,
      },
    },
  })
}
export const obtenerById = async (id) => {
  return await prisma.persona.findFirst({
    where: {
      id: Number(id),
    },
  })
}
export const buscarNoInversionista = async (
  nombre,
  apellido,
  ci,
  propietarioId
) => {
  return await prisma.persona.findMany({
    where: {
      nombre: {
        contains: nombre?.length > 0 ? nombre : undefined,
      },
      apellido: {
        contains: apellido?.length > 0 ? apellido : undefined,
      },
      ci: {
        contains: ci?.length > 0 ? ci : undefined,
      },
      propietarioId: {
        equals: propietarioId ? Number(propietarioId) : null,
      },
      usuario: null,
    },
  })
}
