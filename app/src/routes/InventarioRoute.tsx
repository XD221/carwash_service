import GestionInventario from "@pages/inventario/gestionInventario"
import Productos from "@pages/inventario/productos"

const InventarioRoute = [
  {
    index: true,
    element: "vacio",
  },
  {
    path: "agregar-producto",
    element: <Productos />,
  },
  {
    path: "gestion-inventario",
    element: <GestionInventario />,
  },
]

export default InventarioRoute
