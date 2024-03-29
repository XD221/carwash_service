import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"

const MenuInventario = ({
  id,
  anchorEl,
  open,
  handleClose,
}: {
  id: string
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: (route?: string) => void
}) => {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
      MenuListProps={{
        "aria-labelledby": id,
      }}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={() => handleClose("/inventario/gestion-inventario")}>
        <Typography variant="inherit" noWrap>
          Gestión de inventario
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/inventario/agregar-producto")}>
        <Typography variant="inherit" noWrap>
          Productos
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuInventario
