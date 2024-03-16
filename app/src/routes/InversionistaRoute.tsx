import Servicios from "@pages/inversionista/Servicios"
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
]

export default InversionistaRoute
