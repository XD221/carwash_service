import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async () => {
  return await prisma.persona.findMany()
}
export const obtenerById = async (id) => {
  return await prisma.persona.findFirst({
    where: {
      id: Number(id),
    },
  })
}
export const buscar = async (nombre, apellido, ci) => {
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
    },
  })
}
export const buscarNoInversionista = async (nombre, apellido, ci) => {
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
      usuario: null,
    },
  })
}
