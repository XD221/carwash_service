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
import { restrictAllowOnlyNumber } from "src/utils/helper"
import { TUseGestionPersona } from "@type/persona/TGestionPersona"

const AgregarPersona = ({
  state,
  app,
}: {
  state: TUseGestionPersona
  app: TContextData
}) => {
  return (
    <Modal
      title={
        state.data.modifyMode
          ? "Modificar persona"
          : "Agregar una nueva persona"
      }
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            nombre: "",
            apellido: "",
            ci: "",
            telefono: "",
            correo: "",
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
            <FormControl>
              <InputLabel error={state.data.errors.nombre} required>
                Nombre
              </InputLabel>
              <Input
                error={state.data.errors.nombre}
                value={state.data.createField.nombre}
                inputProps={{ maxLength: 35 }}
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
              <InputLabel error={state.data.errors.apellido} required>
                Apellido
              </InputLabel>
              <Input
                error={state.data.errors.apellido}
                value={state.data.createField.apellido}
                inputProps={{ maxLength: 40 }}
                onChange={(d) =>
                  state.setData({ apellido: d.target.value }, "createField")
                }
              />

              {state.data.errors.apellido && (
                <FormHelperText>
                  El campo apellido no debe estar vacío.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel error={state.data.errors.ci} required>
                CI
              </InputLabel>
              <Input
                error={state.data.errors.ci}
                value={state.data.createField.ci}
                inputProps={{ maxLength: 15 }}
                onChange={(d) =>
                  state.setData({ ci: d.target.value }, "createField")
                }
              />

              {state.data.errors.ci && (
                <FormHelperText>
                  El campo CI no debe estar vacío.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel required>Telefono</InputLabel>
              <Input
                value={state.data.createField.telefono}
                inputProps={{ maxLength: 11 }}
                onChange={(d) =>
                  state.setData({ telefono: d.target.value }, "createField")
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel required>Correo</InputLabel>
              <Input
                value={state.data.createField.correo}
                inputProps={{ maxLength: 60 }}
                onChange={(d) =>
                  state.setData({ correo: d.target.value }, "createField")
                }
              />
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

export default AgregarPersona
