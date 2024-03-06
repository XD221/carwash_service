import AgregarInversionista from "@pages/admin/agregarInversionista"
import TarifaTipoVehiculo from "@pages/admin/tarifaTipoVehiculo"

const AdminRoute = [
  {
    index: true,
    element: "vacio",
  },
  {
    path: "agregar-inversionista",
    element: <AgregarInversionista />,
  },
  {
    path: "tarifa-tipo-vehiculo",
    element: <TarifaTipoVehiculo />,
  },
]

export default AdminRoute
