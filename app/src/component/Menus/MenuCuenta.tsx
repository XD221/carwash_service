import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"
import { TMenu } from "@type/default"

const MenuCuenta = ({ id, anchorEl, open, handleClose }: TMenu) => {
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
      <MenuItem onClick={() => handleClose("/cuenta/configuración")}>
        <Typography variant="inherit" noWrap>
          Configuración
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/logout")}>
        <Typography variant="inherit" noWrap>
          Cerrar Sesión
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuCuenta
