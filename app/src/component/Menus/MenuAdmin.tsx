import { Menu, MenuItem, Typography } from "@mui/material"
import Fade from "@mui/material/Fade"
import { TMenu } from "@type/default"

const MenuAdmin = ({ id, anchorEl, open, handleClose }: TMenu) => {
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
          Agregar inversionista
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default MenuAdmin
