import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (idPropietario) => {
  return await prisma.producto.findMany({
    where: { propietarioId: Number(idPropietario) },
    select: {
      id: true,
      nombre: true,
      precio: true,
    },
  })
}

export const obtenerByNombre = async (nombre, id, idPropietario) => {
  return await prisma.producto.findMany({
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
  return await prisma.producto.findMany({
    where: { propietarioId: Number(idPropietario), estado: true },
  })
}

export const crear = async (nombre, precio, propietarioId) => {
  return await prisma.producto.create({
    data: {
      nombre,
      precio,
      propietarioId: Number(propietarioId),
    },
  })
}

export const modificar = async (nombre, precio, id, propietarioId) => {
  return await prisma.producto.update({
    where: { id: Number(id), propietarioId: Number(propietarioId) },
    data: {
      nombre,
      precio,
    },
  })
}
