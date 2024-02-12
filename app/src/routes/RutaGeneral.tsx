import { lazy } from "react"

// const Index = lazy(() => import("@pages/Index"))
const Admin = import("@route/AdminRoute")
const Cuenta = import("@route/CuentaRoute")
const Inventario = import("@route/InventarioRoute")
const Inversionista = import("@route/InversionistaRoute")
const Operador = import("@route/OperadorRoute")
const Persona = import("@route/PersonaRoute")
const Sucursal = import("@route/SucursalRoute")

const RutaGeneralRoute = [
    {
        path: 'admin',
        element: Admin,
    },
    {
        path: 'cuenta',
        element: Cuenta,
    },
    {
        path: 'inventario',
        element: Inventario,
    },
    {
        path: 'inversionista',
        element: Inversionista,
    },
    {
        path: 'operador',
        element: Operador,
    },
    {
        path: 'persona',
        element: Persona,
    },
    {
        path: 'sucursal',
        element: Sucursal,
    },
]

export default RutaGeneralRoute