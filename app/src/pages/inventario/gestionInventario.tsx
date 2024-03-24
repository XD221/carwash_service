import CustomTable from "@component/CustomTable"
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material"
import { useLayoutEffect } from "react"
import { useApp } from "src/context/AppContext"
import { useGestionInventario } from "src/context/InventarioContext"
import AgregarProductoAlInventarioModal from "./gestionInventario/agregarProductoAlInventarioModal"
import { TSucursalFormat } from "@type/inventario/TGestionInventario"
import VistaPrincipal from "./gestionInventario/VistaPrincipal"
import PopoverConfirm from "@component/PopoverConfirm"

const GestionInventario = () => {
  const state = useGestionInventario()
  const app = useApp()
  useLayoutEffect(() => {
    if (
      state.data.userInfo.role === "INVERSIONISTA" &&
      state.data.sucursalId === 0 &&
      state.data.sucursalData.length === 0
    ) {
      state.functions.beforeInitialState(
        state.setData,
        app.functions.messageApi
      )
    }
  }, [])
  return state.data.userInfo.role === "INVERSIONISTA" &&
    state.data.sucursalId === 0 ? (
    <Card>
      <CardHeader
        style={{ textAlign: "center" }}
        title="Gestión de Inventario"
      />
      <CardContent>
        <Box
          my={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Autocomplete
            noOptionsText="Sin Datos"
            options={state.data.sucursalData}
            style={{ width: "50vmin" }}
            autoComplete
            includeInputInList
            getOptionLabel={(d: TSucursalFormat) => d.nombre}
            onChange={(_, value) =>
              state.setData({ sucursalId: value?.id ?? "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccione Sucursal"
                variant="standard"
              />
            )}
          />
        </Box>
      </CardContent>
    </Card>
  ) : (
    <>
      <VistaPrincipal state={state} app={app} />
      <AgregarProductoAlInventarioModal state={state} app={app} />
      <PopoverConfirm
        message={
          state.data.suspendData.estado
            ? "¿Estás seguro que deseas suspender este producto del inventario?"
            : "¿Estás seguro que deseas habilitar este producto del inventario?"
        }
        open={state.data.suspenderPopover.open}
        onClose={() => state.setData({ open: false }, "suspenderPopover")}
        onConfirm={() =>
          state.data.suspendData.estado
            ? state.functions.suspend_onClick(
                app.functions.messageApi,
                state.setData,
                state.data.suspendData.id
              )
            : state.functions.enable_onClick(
                app.functions.messageApi,
                state.setData,
                state.data.suspendData.id
              )
        }
        anchorEl={state.data.suspenderPopover.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
    </>
  )
}

export default GestionInventario
