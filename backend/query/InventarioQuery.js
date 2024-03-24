import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (sucursalId) => {
  return await prisma.inventario.findMany({
    where: {
      sucursalId: Number(sucursalId),
    },
    select: {
      id: true,
      cantidad: true,
      estado: true,
      producto: {
        select: {
          id: true,
          nombre: true,
          precio: true,
        },
      },
    },
  })
}

export const obtenerByProductoId = async (idProducto, sucursalId) => {
  return await prisma.inventario.findMany({
    where: {
      sucursalId: Number(sucursalId),
      productoId: Number(idProducto),
    },
  })
}

export const obtenerDisponibles = async (propietarioId) => {
  return await prisma.inventario.findMany({
    where: { propietarioId: Number(propietarioId), estado: true },
  })
}

export const crear = async (productoId, cant_init, sucursalId) => {
  return await prisma.inventario.create({
    data: {
      productoId: Number(productoId),
      cantidad: Number(cant_init),
      sucursalId: Number(sucursalId),
    },
  })
}

export const incrementarStock = async (cantidad, productoId, sucursalId) => {
  return await prisma.inventario.update({
    where: {
      sucursalId: Number(sucursalId),
      productoId: Number(productoId),
    },
    data: {
      cantidad: { increment: Number(cantidad) },
    },
  })
}

export const decrementarStock = async (
  cantidad,
  productoId,
  sucursalId,
  id
) => {
  return await prisma.inventario.update({
    where: {
      id: Number(id),
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

export const suspender = async (id, sucursalId) => {
  return await prisma.inventario.update({
    where: {
      id: Number(id),
      sucursalId: Number(sucursalId),
      estado: true,
    },
    data: {
      estado: false,
    },
  })
}

export const habilitar = async (id, sucursalId) => {
  return await prisma.inventario.update({
    where: {
      id: Number(id),
      sucursalId: Number(sucursalId),
      estado: false,
    },
    data: {
      estado: true,
    },
  })
}
