import { PrismaClient, TipoVehiculo } from "@prisma/client"

const prisma = new PrismaClient()

export const obtenerTarifaTipoVehiculo = async (idPropietario) => {
  return await prisma.tarifaTipoVehiculo.findMany({
    where: { propietarioId: Number(idPropietario) },
  })
}

export const obtenerTipoVehiculo = () => {
  return TipoVehiculo
}

export const crearTarifa = async (tipoVehiculo, tarifa, propietarioId) => {
  return await prisma.tarifaTipoVehiculo.create({
    data: {
      tarifa,
      tipoVehiculo,
      propietarioId,
    },
  })
}
