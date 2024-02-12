import { lazy } from "react"

const Admin = import("@routes/AdminRoute")
const Cuenta = import("@routes/CuentaRoute")
const Inventario = import("@routes/InventarioRoute")
const Inversionista = import("@routes/InversionistaRoute")
const Operador = import("@routes/OperadorRoute")
const Persona = import("@routes/PersonaRoute")
const Sucursal = import("@routes/SucursalRoute")

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