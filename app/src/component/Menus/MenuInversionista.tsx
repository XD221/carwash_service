import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"
import { TMenu } from "@type/default"

const MenuInversionista = ({ id, anchorEl, open, handleClose }: TMenu) => {
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
      <MenuItem
        onClick={() => handleClose("/inversionista/tarifa-tipo-vehiculo")}
      >
        <Typography variant="inherit" noWrap>
          Tarifa de tipo de vehículo
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/inversionista/servicios")}>
        <Typography variant="inherit" noWrap>
          Servicios
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClose("/inversionista/sucursales")}>
        <Typography variant="inherit" noWrap>
          Sucursales
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuInversionista
