import AgregarInversionista from "@pages/admin/agregarInversionista"

const AdminRoute = [
  {
    index: true,
    element: "vacio",
  },
  {
    path: "agregar-inversionista",
    element: <AgregarInversionista />,
  },
]

export default AdminRoute
