import CustomTable from "@component/CustomTable"
import { Card, CardContent, CardHeader } from "@mui/material"
import { useTarifaTipoVehiculo } from "src/context/AdminContext"

const TarifaTipoVehiculo = () => {
  const state = useTarifaTipoVehiculo()
  return (
    <Card>
      <CardHeader
        style={{ textAlign: "center" }}
        title="Tarifa de Tipo de Vehículo"
      />
      <CardContent>
        {/* <CustomTable columns={state.functions.} /> */}
      </CardContent>
    </Card>
  )
}

export default TarifaTipoVehiculo
