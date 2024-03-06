import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@mui/material"
import { TUseAgregarInversionista } from "@type/admin/TAgregarInversionista"
import { TContextData } from "@type/default"
import { restrictAllowOnlyNumber } from "src/utils/helper"

const RegistrarNuevaPersona = ({
  state,
  app,
}: {
  state: TUseAgregarInversionista
  app: TContextData
}) => {
  return (
    <Grid item xs={12}>
      <div id="tab1-content" role="tabpanel" aria-labelledby="tab1">
        <Box
          my={1}
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          onSubmit={(d) =>
            state.functions.crearInversionista_onClick(
              d,
              app.functions.messageApi,
              state.setData
            )
          }
          gap={2}
        >
          <FormControl>
            <InputLabel error={state.data.errors.ci} required>
              CI
            </InputLabel>
            <Input
              error={state.data.errors.ci}
              value={state.data.createField.ci}
              onInput={(d) => restrictAllowOnlyNumber(d)}
              inputProps={{ maxLength: 15 }}
              onChange={(d) =>
                state.setData({ ci: d.target.value }, "createField")
              }
            />
          </FormControl>
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
          </FormControl>
          <FormControl>
            <InputLabel>Apellido</InputLabel>
            <Input
              value={state.data.createField.apellido}
              inputProps={{ maxLength: 40 }}
              onChange={(d) =>
                state.setData({ apellido: d.target.value }, "createField")
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel error={state.data.errors.telefono} required>
              Telefono
            </InputLabel>
            <Input
              error={state.data.errors.telefono}
              value={state.data.createField.telefono}
              onInput={(d) => restrictAllowOnlyNumber(d)}
              inputProps={{ maxLength: 9 }}
              onChange={(d) =>
                state.setData({ telefono: d.target.value }, "createField")
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel>Correo</InputLabel>
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
              Registrar
            </Button>
          </FormControl>
        </Box>
      </div>
    </Grid>
  )
}

export default RegistrarNuevaPersona
