import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"

const MenuPersona = ({
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
      <MenuItem onClick={() => handleClose("/persona/gestion-persona")}>
        <Typography variant="inherit" noWrap>
          Gestión de persona
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuPersona
