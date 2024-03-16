import Modal from "@component/Modal"
import {
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material"
import { TUseTarifaTipoVehiculo } from "@type/inversionista/TTarifaTipoVehiculo"
import { TContextData } from "@type/default"
import { restrictAllowOnlyNumberDecimal } from "src/utils/helper"

const AgregarTarifaModal = ({
  state,
  app,
}: {
  state: TUseTarifaTipoVehiculo
  app: TContextData
}) => {
  return (
    <Modal
      title="Agregar Tarifa"
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            tipoVehiculo: "",
            tarifa: "",
          },
        })
      }
    >
      <Grid item xs={12}>
        <div id="tab1-content" role="tabpanel" aria-labelledby="tab1">
          <Box
            my={1}
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            onSubmit={(d) =>
              state.functions.create_onFinish(
                d,
                app.functions.messageApi,
                state.setData
              )
            }
            gap={2}
          >
            <FormControl variant="standard" sx={{ width: "40%" }}>
              <InputLabel error={state.data.errors.tipoVehiculo} required>
                Tipo de Vehículo
              </InputLabel>
              <Select
                value={state.data.createField.tipoVehiculo}
                onChange={(d) =>
                  state.setData({ tipoVehiculo: d.target.value }, "createField")
                }
              >
                {state.data.tipoVehiculoData?.map((p) => (
                  <MenuItem key={p.value} value={p.value}>
                    <em>{p.label}</em>
                  </MenuItem>
                ))}
              </Select>
              {state.data.errors.tipoVehiculo && (
                <FormHelperText>
                  Debe seleccionar un tipo de vehículo.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel error={state.data.errors.tarifa > 0} required>
                Tarifa
              </InputLabel>
              <Input
                error={state.data.errors.tarifa > 0}
                value={state.data.createField.tarifa}
                inputProps={{ maxLength: 11 }}
                onInput={(d) => restrictAllowOnlyNumberDecimal(d)}
                onChange={(d) =>
                  state.setData({ tarifa: d.target.value }, "createField")
                }
              />
              {state.data.errors.tarifa === 1 && (
                <FormHelperText>
                  El campo tarifa no debe estar vacío.
                </FormHelperText>
              )}

              {state.data.errors.tarifa === 2 && (
                <FormHelperText>
                  Campo Inválido, verifique si el formato esta correctamente.
                </FormHelperText>
              )}
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
  )
}

export default AgregarTarifaModal
