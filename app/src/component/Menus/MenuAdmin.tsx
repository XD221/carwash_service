import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"

const MenuAdmin = ({
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
      <MenuItem onClick={() => handleClose("/admin/agregar-inversionista")}>
        <Typography variant="inherit" noWrap>
          Agregar Inversionista
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/admin/tarifa-tipo-vehiculo")}>
        <Typography variant="inherit" noWrap>
          Tarifa de tipo de vehículo
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/admin/ejemplo-c")}>
        <Typography variant="inherit" noWrap>
          Ejemplo C
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuAdmin
