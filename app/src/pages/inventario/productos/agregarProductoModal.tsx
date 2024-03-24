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
import { TUseProductos } from "@type/inventario/TProductos"
import { restrictAllowOnlyNumberDecimal } from "src/utils/helper"

const AgregarProductosModal = ({
  state,
  app,
}: {
  state: TUseProductos
  app: TContextData
}) => {
  return (
    <Modal
      title={state.data.modifyMode ? "Modificar producto" : "Agregar producto"}
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            nombre: "",
            precio: "0",
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
              <InputLabel>Precio</InputLabel>
              <Input
                value={state.data.createField.precio}
                inputProps={{ maxLength: 11 }}
                onInput={(d) => restrictAllowOnlyNumberDecimal(d)}
                onChange={(d) =>
                  state.setData({ precio: d.target.value }, "createField")
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

export default AgregarProductosModal
