import Modal from "@component/Modal"
import {
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material"
import { TContextData } from "@type/default"
import {
  TProductoFormat,
  TUseGestionInventario,
} from "@type/inventario/TGestionInventario"
import { restrictAllowOnlyNumber } from "src/utils/helper"

const AgregarProductoAlInventarioModal = ({
  state,
  app,
}: {
  state: TUseGestionInventario
  app: TContextData
}) => {
  return (
    <Modal
      title="Agregar producto al inventario"
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            producto: "",
            cant_init: "0",
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
            <FormControl variant="standard" sx={{ width: "60%" }}>
              <Autocomplete
                options={state.data.productosRows}
                autoComplete
                includeInputInList
                getOptionLabel={(d: TProductoFormat) => d.nombre}
                onChange={(_, value) =>
                  state.setData(
                    { producto: value?.id?.toString() ?? "" },
                    "createField"
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Producto"
                    error={state.data.errors.producto}
                    variant="standard"
                    required
                  />
                )}
              />
              {state.data.errors.producto && (
                <FormHelperText>Debe seleccionar un producto.</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="standard" sx={{ width: "60%" }}>
              <InputLabel>Cantidad Inicial</InputLabel>
              <Input
                value={state.data.createField.cant_init}
                inputProps={{ maxLength: 11 }}
                onInput={(d) => restrictAllowOnlyNumber(d, true)}
                onChange={(d) =>
                  state.setData({ cant_init: d.target.value }, "createField")
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
    </Modal>
  )
}

export default AgregarProductoAlInventarioModal
