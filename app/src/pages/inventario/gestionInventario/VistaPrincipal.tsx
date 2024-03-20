import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { TContextData } from "@type/default"
import { TUseGestionInventario } from "@type/inventario/TGestionInventario"
import { useLayoutEffect } from "react"

const VistaPrincipal = ({
  state,
  app,
}: {
  state: TUseGestionInventario
  app: TContextData
}) => {
  useLayoutEffect(() => {
    if (state.data.productosRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <Card>
      <CardHeader
        style={{ textAlign: "center" }}
        title="Gestión de Inventario"
      />
      <CardContent>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() =>
              state.setData({
                addModalOpen: !state.data.addModalOpen,
              })
            }
          >
            Agregar Producto
          </Button>
        </div>
        <CustomTable
          columns={state.functions.columns(state.setData)}
          rows={state.data.inventarioRows}
        />
      </CardContent>
    </Card>
  )
}

export default VistaPrincipal
