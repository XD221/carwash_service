import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"
import { TMenu } from "@type/default"

const MenuInventario = ({ id, anchorEl, open, handleClose }: TMenu) => {
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
