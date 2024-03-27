import MenuAdmin from "./Menus/MenuAdmin"
import MenuCuenta from "./Menus/MenuCuenta"
import MenuInventario from "./Menus/MenuInventario"
import MenuInversionista from "./Menus/MenuInversionista"
import MenuPersona from "./Menus/MenuPersona"
import MenuVehiculos from "./Menus/MenuVehiculos"

const MenuController = ({
  id,
  anchorEl,
  open,
  controlName,
  menuNames = {
    admin: "adminMenu",
    cuenta: "cuentaMenu",
    inventario: "inventarioMenu",
    inversionista: "inversionistaMenu",
    operador: "operadorMenu",
    sucursal: "sucursalMenu",
    persona: "personaMenu",
    vehiculo: "vehiculoMenu",
  },
  handleClose,
}: {
  id: string
  anchorEl: null | HTMLElement
  open: boolean
  controlName: string
  menuNames?: {
    admin: string
    cuenta: string
    inventario: string
    inversionista: string
    operador: string
    sucursal: string
    persona: string
    vehiculo: string
  }
  handleClose: (route?: string) => void
}) => {
  if (controlName === menuNames.admin)
    return (
      <MenuAdmin
        id={menuNames.admin}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )
  else if (controlName === menuNames.inventario)
    return (
      <MenuInventario
        id={menuNames.inventario}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )
  else if (controlName === menuNames.inversionista)
    return (
      <MenuInversionista
        id={menuNames.inversionista}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )
  else if (controlName === menuNames.cuenta)
    return (
      <MenuCuenta
        id={menuNames.cuenta}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )
  else if (controlName === menuNames.persona)
    return (
      <MenuPersona
        id={menuNames.persona}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )
  else if (controlName === menuNames.vehiculo)
    return (
      <MenuVehiculos
        id={menuNames.vehiculo}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    )

  return <></>
}

export default MenuController
