import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (propietarioId) => {
  return await prisma.servicio.findMany({
    where: { propietarioId: Number(propietarioId) },
  })
}

export const obtenerServiciosSucursal = async (sucursalId, propietarioId) => {
  return await prisma.sucursalServicio.findMany({
    where: {
      sucursalId: Number(sucursalId),
      sucursal: {
        propietarioId: {
          equals: Number(propietarioId),
        },
      },
    },
    select: {
      estado: true,
      servicio: {
        select: {
          id: true,
          nombre: true,
          precio: true,
          descripcion: true,
        },
      },
    },
  })
}

export const obtenerByNombre = async (nombre, id, propietarioId) => {
  return await prisma.servicio.findMany({
    where: {
      propietarioId: Number(propietarioId),
      id: {
        not: Number(id),
      },
      nombre,
    },
  })
}

export const obtenerServiciosSucursalById = async (servicioId, sucursalId) => {
  return await prisma.sucursalServicio.findFirst({
    where: {
      servicioId: Number(servicioId),
      sucursalId: Number(sucursalId),
    },
  })
}

export const agregarServicioSucursal = async (servicioId, sucursalId) => {
  return await prisma.sucursalServicio.create({
    data: {
      servicioId: Number(servicioId),
      sucursalId: Number(sucursalId),
    },
  })
}

export const obtenerDisponibles = async (propietarioId) => {
  return await prisma.servicio.findMany({
    where: { propietarioId: Number(propietarioId), estado: true },
  })
}

export const crear = async (nombre, precio, descripcion, propietarioId) => {
  return await prisma.servicio.create({
    data: {
      nombre,
      precio,
      descripcion,
      propietarioId: Number(propietarioId),
    },
  })
}

export const modificar = async (
  nombre,
  precio,
  descripcion,
  id,
  propietarioId
) => {
  return await prisma.servicio.update({
    where: { id: Number(id), propietarioId: Number(propietarioId) },
    data: {
      nombre,
      precio,
      descripcion,
    },
  })
}

export const suspender = async (sucursalId, servicioId) => {
  return await prisma.sucursalServicio.update({
    where: {
      servicioId_sucursalId: {
        sucursalId: Number(sucursalId),
        servicioId: Number(servicioId),
      },
      estado: true,
    },
    data: {
      estado: false,
    },
  })
}

export const habilitar = async (sucursalId, servicioId) => {
  return await prisma.sucursalServicio.update({
    where: {
      servicioId_sucursalId: {
        sucursalId: Number(sucursalId),
        servicioId: Number(servicioId),
      },
      estado: false,
    },
    data: {
      estado: true,
    },
  })
}
