import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (idPropietario) => {
  return await prisma.sucursal.findMany({
    where: { propietarioId: Number(idPropietario) },
  })
}

export const obtenerByNombre = async (nombre, id, idPropietario) => {
  return await prisma.sucursal.findMany({
    where: {
      propietarioId: Number(idPropietario),
      id: {
        not: Number(id),
      },
      nombre,
    },
  })
}

export const obtenerDisponibles = async (idPropietario) => {
  return await prisma.sucursal.findMany({
    where: { propietarioId: Number(idPropietario), estado: true },
  })
}

export const crear = async (nombre, direccion, propietarioId) => {
  return await prisma.sucursal.create({
    data: {
      nombre,
      direccion,
      propietarioId: Number(propietarioId),
    },
  })
}

export const modificar = async (nombre, direccion, id, propietarioId) => {
  return await prisma.sucursal.update({
    where: { id: Number(id), propietarioId: Number(propietarioId) },
    data: {
      nombre,
      direccion,
    },
  })
}

export const suspender = async (id, propietarioId) => {
  return await prisma.sucursal.update({
    where: {
      id: Number(id),
      propietarioId: Number(propietarioId),
      estado: true,
    },
    data: {
      estado: false,
    },
  })
}

export const habilitar = async (id, propietarioId) => {
  return await prisma.sucursal.update({
    where: {
      id: Number(id),
      propietarioId: Number(propietarioId),
      estado: false,
    },
    data: {
      estado: true,
    },
  })
}
