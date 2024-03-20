import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (sucursalId) => {
  return await prisma.inventario.findMany({
    where: {
      sucursalId: Number(sucursalId),
    },
  })
}

export const obtenerByProductoId = async (idProducto, id, propietarioId) => {
  return await prisma.inventario.findMany({
    where: {
      propietarioId: Number(propietarioId),
      id: {
        not: Number(id),
      },
      productoId: Number(idProducto),
    },
  })
}

export const obtenerDisponibles = async (propietarioId) => {
  return await prisma.inventario.findMany({
    where: { propietarioId: Number(propietarioId), estado: true },
  })
}

export const crear = async (nombre, precio, propietarioId) => {
  return await prisma.inventario.create({
    data: {
      nombre,
      precio,
      propietarioId: Number(propietarioId),
    },
  })
}

export const incrementarStock = async (
  cantidad,
  productoId,
  sucursalId,
  id,
  propietarioId
) => {
  return await prisma.inventario.update({
    where: {
      id: Number(id),
      propietarioId: Number(propietarioId),
      sucursalId: Number(sucursalId),
      productoId: Number(productoId),
    },
    data: {
      cantidad: { increment: cantidad },
    },
  })
}

export const decrementarStock = async (
  cantidad,
  productoId,
  sucursalId,
  id,
  propietarioId
) => {
  return await prisma.inventario.update({
    where: {
      id: Number(id),
      propietarioId: Number(propietarioId),
      sucursalId: Number(sucursalId),
      productoId: Number(productoId),
      cantidad: {
        gte: cantidad,
      },
    },
    data: {
      cantidad: { decrement: cantidad },
    },
  })
}
