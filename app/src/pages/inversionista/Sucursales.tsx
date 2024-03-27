import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useLayoutEffect } from "react"
import { useApp } from "src/context/AppContext"
import { useSucursales } from "src/context/InversionistaContext"
import PopoverConfirm from "@component/PopoverConfirm"
import AgregarSucursalesModal from "./Sucursales/agregarSucursalesModal"
import VistaServiciosSucuralModal from "./Sucursales/vistaServiciosSucuralModal"

const Sucursales = () => {
  const state = useSucursales()
  const app = useApp()
  useLayoutEffect(() => {
    if (state.data.sucursalesRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <>
      <Card>
        <CardHeader style={{ textAlign: "center" }} title="Sucursales" />
        <CardContent>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() =>
                state.setData({
                  addModalOpen: !state.data.addModalOpen,
                  modifyMode: false,
                })
              }
            >
              Agregar
            </Button>
          </div>
          <CustomTable
            columns={state.functions.columns(
              state.setData,
              app.functions.messageApi
            )}
            rows={state.data.sucursalesRows}
          />
        </CardContent>
      </Card>
      <AgregarSucursalesModal state={state} app={app} />
      <VistaServiciosSucuralModal state={state} app={app} />
      <PopoverConfirm
        message={
          state.data.assignData.open
            ? state.data.suspendData.estado
              ? "¿Estás seguro que deseas suspender este servicio?"
              : "¿Estás seguro que deseas habilitar este servicio?"
            : state.data.suspendData.estado
            ? "¿Estás seguro que deseas suspender esta sucursal?"
            : "¿Estás seguro que deseas habilitar esta sucursal?"
        }
        open={state.data.suspenderPopover.open}
        onClose={() => state.setData({ open: false }, "suspenderPopover")}
        onConfirm={() =>
          state.data.assignData.open
            ? state.data.suspendData.estado
              ? state.functions.suspendServicio_onClick(
                  app.functions.messageApi,
                  state.setData
                )
              : state.functions.enableServicio_onClick(
                  app.functions.messageApi,
                  state.setData
                )
            : state.data.suspendData.estado
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

export default Sucursales
