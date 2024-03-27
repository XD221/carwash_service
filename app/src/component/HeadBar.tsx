import * as React from "react"
import PropTypes from "prop-types"

import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Drawer from "@mui/material/Drawer"
import MenuIcon from "@mui/icons-material/Menu"
import ToggleColorMode from "./ToggleColorMode"
import { IconButton, useColorScheme } from "@mui/material"
import MenuController from "./MenuController"
import { useNavigate } from "react-router-dom"
import { AccountCircle } from "@mui/icons-material"
import { getUserInfo } from "src/utils/helper"

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
}

function HeadBar() {
  const [openDrawer, setOpen] = React.useState(false)
  const [controlName, setControlName] = React.useState("")
  const { mode, setMode } = useColorScheme()
  const navigate = useNavigate()
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setControlName(event.currentTarget.getAttribute("aria-controls") as string)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (route?: string) => {
    setAnchorEl(null)
    if (route) navigate(route)
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={"/images/logo.png"}
                style={logoStyle}
                alt="logo de CARWASH"
                onClick={() => navigate("/")}
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  aria-controls="adminMenu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Admin
                  </Typography>
                </Button>
                <Button
                  aria-controls="inventarioMenu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Inventario
                  </Typography>
                </Button>
                <Button
                  aria-controls="inversionistaMenu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Inversionista
                  </Typography>
                </Button>
                <Button
                  aria-controls="personaMenu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Persona
                  </Typography>
                </Button>
                <Button
                  aria-controls="vehiculoMenu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Vehiculos
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode
                mode={mode as string}
                toggleColorMode={toggleColorMode}
              />
              <div>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="cuentaMenu"
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="default"
                >
                  <AccountCircle fontSize="small" />
                  {getUserInfo().nombre}
                  <span style={{ fontSize: "10px" }}>
                    ({getUserInfo().role})
                  </span>
                </IconButton>
              </div>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode as string}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Admin
                  </Button>
                  <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Testimonials
                  </Button>
                  <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Highlights
                  </Button>
                  <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Pricing
                  </Button>
                  <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    FAQ
                  </Button>
                  <Divider />
                  <Button>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Cerrar sesión
                    </Button>
                  </Button>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MenuController
        id="menuController"
        controlName={controlName}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </div>
  )
}

export default HeadBar
