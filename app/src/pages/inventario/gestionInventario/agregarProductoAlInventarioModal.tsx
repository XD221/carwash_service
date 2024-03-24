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
      title={
        state.data.increasedStockMode
          ? "Incrementar Stock del producto"
          : "Agregar producto al inventario"
      }
      open={state.data.addModalOpen}
      onClose={() =>
        state.setData({
          addModalOpen: false,
          createField: {
            productoId: "",
            cant_init: "0",
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
              state.data.increasedStockMode
                ? state.functions.increasedStock_onFinish(
                    d,
                    app.functions.messageApi,
                    state.setData
                  )
                : state.functions.create_onFinish(
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
                value={state.data.createField.producto}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                disabled={state.data.increasedStockMode}
                autoComplete
                includeInputInList
                getOptionLabel={(d: TProductoFormat) => d.nombre}
                onChange={(_, value) =>
                  state.setData(
                    {
                      productoId: value?.id?.toString() ?? "",
                      producto: value,
                    },
                    "createField"
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Producto"
                    error={state.data.errors.productoId}
                    variant="standard"
                    required
                  />
                )}
              />
              {state.data.errors.productoId && (
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
