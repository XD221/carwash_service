import { PrismaClient, TipoVehiculo } from "@prisma/client"

const prisma = new PrismaClient()

export const obtener = async (idPropietario) => {
  return await prisma.servicio.findMany({
    where: { propietarioId: Number(idPropietario) },
  })
}

export const obtenerDisponibles = async (idPropietario) => {
  return await prisma.servicio.findMany({
    where: { propietarioId: Number(idPropietario), estado: true },
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

export const suspender = async (id, propietarioId) => {
  return await prisma.servicio.update({
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
  return await prisma.servicio.update({
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
