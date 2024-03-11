import CustomTable from "@component/CustomTable"
import Modal from "@component/Modal"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material"
import { useLayoutEffect } from "react"
import { useTarifaTipoVehiculo } from "src/context/AdminContext"
import { useApp } from "src/context/AppContext"

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
      <Modal
        title="Agregar Tarifa"
        open={state.data.addModalOpen}
        onClose={() => state.setData({ addModalOpen: false })}
      >
        <Grid item xs={12}>
          <div id="tab1-content" role="tabpanel" aria-labelledby="tab1">
            <Box
              my={1}
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              // onSubmit={(d) =>
              //   state.functions.crearInversionista_onClick(
              //     d,
              //     app.functions.messageApi,
              //     state.setData
              //   )
              // }
              gap={2}
            >
              <FormControl variant="standard" sx={{ width: "40%" }}>
                <InputLabel error={state.data.errors.tipoVehiculo} required>
                  Tipo de Vehículo
                </InputLabel>
                <Select>
                  {state.data.tipoVehiculoData?.map((p) => (
                    <MenuItem key={p.value} value={p.value}>
                      <em>{p.label}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel
                  // error={state.data.errors.nombre}
                  required
                >
                  Nombre
                </InputLabel>
                <Input
                  // error={state.data.errors.nombre}
                  // value={state.data.createField.nombre}
                  inputProps={{ maxLength: 35 }}
                  // onChange={(d) =>
                  //   state.setData({ nombre: d.target.value }, "createField")
                  // }
                />
              </FormControl>
              <FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registrar
                </Button>
              </FormControl>
            </Box>
          </div>
        </Grid>
      </Modal>
    </>
  )
}

export default TarifaTipoVehiculo
