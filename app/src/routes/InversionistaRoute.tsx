import Servicios from "@pages/inversionista/Servicios"
import Sucursales from "@pages/inversionista/Sucursales"
import TarifaTipoVehiculo from "@pages/inversionista/tarifaTipoVehiculo"

const InversionistaRoute = [
  {
    index: true,
    element: "vacio",
  },
  {
    path: "tarifa-tipo-vehiculo",
    element: <TarifaTipoVehiculo />,
  },
  {
    path: "servicios",
    element: <Servicios />,
  },
  {
    path: "sucursales",
    element: <Sucursales />,
  },
]

export default InversionistaRoute
