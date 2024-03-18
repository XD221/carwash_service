import Modal from "@component/Modal"
import {
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material"
import { TContextData } from "@type/default"
import { TUseSucursales } from "@type/inversionista/TSucursales"
import { restrictAllowOnlyNumberDecimal } from "src/utils/helper"

const AgregarSucursalesModal = ({
  state,
  app,
}: {
  state: TUseSucursales
  app: TContextData
}) => {
  return (
    <Modal
      title={state.data.modifyMode ? "Modificar Sucursal" : "Agregar Sucursal"}
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            nombre: "",
            direccion: "",
            id: "",
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
            <FormControl variant="standard">
              <InputLabel error={state.data.errors.nombre} required>
                Nombre
              </InputLabel>
              <Input
                error={state.data.errors.nombre}
                value={state.data.createField.nombre}
                inputProps={{ maxLength: 60 }}
                onChange={(d) =>
                  state.setData({ nombre: d.target.value }, "createField")
                }
              />
              {state.data.errors.nombre && (
                <FormHelperText>
                  El campo nombre no debe estar vacío.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth={state.data.createDireccionFieldFullWidth}>
              <InputLabel>Dirección</InputLabel>
              <Input
                multiline={state.data.createDireccionFieldFullWidth}
                value={state.data.createField.direccion}
                inputProps={{ maxLength: 255 }}
                autoFocus={state.data.createDireccionFieldFullWidth}
                onFocus={(d) =>
                  state.setData({ createDireccionFieldFullWidth: true })
                }
                onBlur={() =>
                  state.setData({
                    createDireccionFieldFullWidth: false,
                  })
                }
                onChange={(d) =>
                  state.setData({ direccion: d.target.value }, "createField")
                }
              />
            </FormControl>
            <FormControl>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                {state.data.modifyMode ? "Modificar" : "Registrar"}
              </Button>
            </FormControl>
          </Box>
        </div>
      </Grid>
    </Modal>
  )
}

export default AgregarSucursalesModal
