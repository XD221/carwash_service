import { Fade, Menu, MenuItem, Typography } from "@mui/material"
import { TMenu } from "@type/default"

export default function MenuVehiculos(props: TMenu) {
  return (
    <Menu
      id={props.id}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={() => props.handleClose()}
      MenuListProps={{
        "aria-labelledby": props.id,
      }}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={() => props.handleClose("/vehiculo/gestion-vehiculo")}>
        <Typography variant="inherit" noWrap>
          Gestión de vehiculos
        </Typography>
      </MenuItem>
    </Menu>
  )
}
