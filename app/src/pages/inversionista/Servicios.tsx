import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useLayoutEffect } from "react"
import { useApp } from "src/context/AppContext"
import { useServicios } from "src/context/InversionistaContext"
import AgregarServiciosModal from "./Servicios/agregarServiciosModal"

const Servicios = () => {
  const state = useServicios()
  const app = useApp()
  useLayoutEffect(() => {
    if (state.data.serviciosRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <>
      <Card>
        <CardHeader style={{ textAlign: "center" }} title="Servicios" />
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
              app.functions.messageApi,
              state.setData
            )}
            rows={state.data.serviciosRows}
          />
        </CardContent>
      </Card>
      <AgregarServiciosModal state={state} app={app} />
    </>
  )
}

export default Servicios
