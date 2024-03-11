import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const login = async (data) => {
  const { username, password } = data
  const authorization = await prisma.usuario.findFirst({
    where: {
      username: username,
      password: password,
      estado: true,
    },
    select: {
      id: true,
      username: true,
      role: true,
      persona: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
    },
  })

  if (authorization) {
    return authorization
  }
  return false
}

export const obtenerInfoById = async (id) => {
  return await prisma.usuario.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      personaId: true,
      persona: {
        select: {
          nombre: true,
          apellido: true,
          telefono: true,
          ci: true,
          correo: true,
          direccion: true,
          propietarioId: true,
        },
      },
    },
  })
}

export const crearInversionista_personaExistente = async (id, ci, password) => {
  return await prisma.usuario.create({
    data: {
      username: ci,
      password: password,
      role: "INVERSIONISTA",
      personaId: id,
    },
  })
}
export const crearInversionista = async (data) => {
  const {
    nombre,
    apellido,
    telefono,
    ci,
    correo,
    direccion,
    password,
    propietarioId,
  } = data
  return await prisma.usuario.create({
    data: {
      username: ci,
      password: password,
      role: "INVERSIONISTA",
      persona: {
        create: {
          nombre,
          apellido,
          telefono: Number(telefono),
          ci,
          correo,
          direccion,
          propietarioId,
        },
      },
    },
  })
}
