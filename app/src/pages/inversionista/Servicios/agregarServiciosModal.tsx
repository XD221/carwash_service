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
import { TUseServicios } from "@type/inversionista/TServicios"
import { restrictAllowOnlyNumberDecimal } from "src/utils/helper"

const AgregarServiciosModal = ({
  state,
  app,
}: {
  state: TUseServicios
  app: TContextData
}) => {
  return (
    <Modal
      title={state.data.modifyMode ? "Modificar servicio" : "Agregar servicio"}
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            nombre: "",
            precio: "",
            descripcion: "",
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
            <FormControl>
              <InputLabel error={state.data.errors.precio > 0} required>
                Precio
              </InputLabel>
              <Input
                error={state.data.errors.precio > 0}
                value={state.data.createField.precio}
                inputProps={{ maxLength: 11 }}
                onInput={(d) => restrictAllowOnlyNumberDecimal(d)}
                onChange={(d) =>
                  state.setData({ precio: d.target.value }, "createField")
                }
              />
              {state.data.errors.precio === 1 && (
                <FormHelperText>
                  El campo precio no debe estar vacío.
                </FormHelperText>
              )}
              {state.data.errors.precio === 2 && (
                <FormHelperText>
                  Campo Inválido, verifique si el formato esta correctamente.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth={state.data.createDescripcionFieldFullWidth}>
              <InputLabel>Descripción</InputLabel>
              <Input
                multiline={state.data.createDescripcionFieldFullWidth}
                value={state.data.createField.descripcion}
                inputProps={{ maxLength: 255 }}
                autoFocus={state.data.createDescripcionFieldFullWidth}
                onFocus={(d) =>
                  state.setData({ createDescripcionFieldFullWidth: true })
                }
                onBlur={() =>
                  state.setData({
                    createDescripcionFieldFullWidth: false,
                  })
                }
                onChange={(d) =>
                  state.setData({ descripcion: d.target.value }, "createField")
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

export default AgregarServiciosModal
