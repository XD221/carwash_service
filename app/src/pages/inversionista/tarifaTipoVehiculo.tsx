import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useLayoutEffect } from "react"
import { useTarifaTipoVehiculo } from "src/context/InversionistaContext"
import { useApp } from "src/context/AppContext"
import AgregarTarifaModal from "./tarifaTipoVehiculo/agregarTarifaModal"

const TarifaTipoVehiculo = () => {
  const app = useApp()
  const state = useTarifaTipoVehiculo()
  useLayoutEffect(() => {
    if (state.data.tarifaRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <>
      <Card>
        <CardHeader
          style={{ textAlign: "center" }}
          title="Tarifa de Tipo de Vehículo"
        />
        <CardContent>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() =>
                state.setData({ addModalOpen: !state.data.addModalOpen })
              }
            >
              Agregar
            </Button>
          </div>
          <CustomTable
            columns={state.functions.columns()}
            rows={state.data.tarifaRows}
          />
        </CardContent>
      </Card>
      <AgregarTarifaModal state={state} app={app} />
    </>
  )
}

export default TarifaTipoVehiculo
