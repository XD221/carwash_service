import Login from "@pages/cuenta/login"
import Logout from "@pages/cuenta/logout"
import Admin from "@routes/AdminRoute"
import Cuenta from "@routes/CuentaRoute"
import Inventario from "@routes/InventarioRoute"
import Inversionista from "@routes/InversionistaRoute"
import Operador from "@routes/OperadorRoute"
import Persona from "@routes/PersonaRoute"
import Sucursal from "@routes/SucursalRoute"

const RutaGeneralRoute = [
  {
    path: "admin",
    children: Admin,
  },
  {
    path: "cuenta",
    children: Cuenta,
  },
  {
    path: "inventario",
    children: Inventario,
  },
  {
    path: "inversionista",
    children: Inversionista,
  },
  {
    path: "operador",
    children: Operador,
  },
  {
    path: "persona",
    children: Persona,
  },
  {
    path: "sucursal",
    children: Sucursal,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]

export default RutaGeneralRoute
