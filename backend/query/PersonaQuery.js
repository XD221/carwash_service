import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (
  nombre,
  apellido,
  ci,
  telefono, // solo se usa para quitar la limitación de la cantidad de datos
  propietarioId
) => {
  let consultData = {
    where: {
      propietarioId: {
        equals: propietarioId ? Number(propietarioId) : null,
      },
      nombre: {
        contains: nombre,
      },
      apellido: {
        contains: apellido,
      },
      ci: {
        contains: ci,
      },
    },
    orderBy: {
      id: "desc",
    },
  }
  if (telefono.length === 0) consultData["take"] = 100
  return await prisma.persona.findMany(consultData)
}

export const crear = async (
  nombre,
  apellido,
  telefono,
  ci,
  correo,
  direccion,
  propietarioId
) => {
  return await prisma.persona.create({
    data: {
      nombre,
      apellido,
      telefono: Number(telefono),
      ci,
      correo,
      direccion,
      propietarioId: Number(propietarioId),
    },
  })
}

export const modificar = async (
  nombre,
  apellido,
  telefono,
  ci,
  correo,
  direccion,
  id,
  propietarioId
) => {
  return await prisma.persona.update({
    where: {
      id: Number(id),
      propietarioId: Number(propietarioId),
    },
    data: {
      nombre,
      apellido,
      telefono: Number(telefono),
      ci,
      correo,
      direccion,
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

export const obtenerByCI = async (ci, id, propietarioId) => {
  return await prisma.persona.findFirst({
    where: {
      id: {
        not: Number(id),
      },
      ci,
      propietarioId: Number(propietarioId),
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
    take: 100,
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
    orderBy: {
      id: "desc",
    },
  })
}
