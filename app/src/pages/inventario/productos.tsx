import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useLayoutEffect } from "react"
import { useApp } from "src/context/AppContext"
import { useProductos } from "src/context/InventarioContext"
import AgregarProductosModal from "./productos/agregarProductoModal"

const Productos = () => {
  const state = useProductos()
  const app = useApp()
  useLayoutEffect(() => {
    if (state.data.productosRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <>
      <Card>
        <CardHeader style={{ textAlign: "center" }} title="Productos" />
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
            columns={state.functions.columns(state.setData)}
            rows={state.data.productosRows}
          />
        </CardContent>
      </Card>
      <AgregarProductosModal state={state} app={app} />
    </>
  )
}

export default Productos
