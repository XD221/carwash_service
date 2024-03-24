import { PrismaClient, TipoVehiculo } from "@prisma/client"

const prisma = new PrismaClient()

export const obtenerTarifaTipoVehiculo = async (propietarioId) => {
  return await prisma.tarifaTipoVehiculo.findMany({
    where: { propietarioId: Number(propietarioId) },
    orderBy: { estado: "desc" },
  })
}

export const obtenerTipoVehiculo = () => {
  return TipoVehiculo
}

export const crearTarifa = async (tipoVehiculo, tarifa, propietarioId) => {
  const [_, result] = await prisma.$transaction([
    prisma.tarifaTipoVehiculo.updateMany({
      where: { estado: true, tipoVehiculo },
      data: {
        estado: false,
      },
    }),
    prisma.tarifaTipoVehiculo.create({
      data: {
        tarifa,
        tipoVehiculo,
        propietarioId,
      },
    }),
  ])
  return result
}
