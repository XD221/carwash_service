import CustomTable from "@component/CustomTable"
import Modal from "@component/Modal"
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material"
import { TContextData } from "@type/default"
import {
  TServicioFormat,
  TUseSucursales,
} from "@type/inversionista/TSucursales"
import { useState } from "react"

const VistaServiciosSucuralModal = ({
  state,
  app,
}: {
  state: TUseSucursales
  app: TContextData
}) => {
  const [servicioField, setServicioField] = useState<string>("")
  return (
    <Modal
      title="Vista de servicios"
      width={1000}
      open={state.data.assignData.open}
      onClose={() => {
        state.setData({
          assignData: {
            open: false,
            id: "",
            servicioId: "",
          },
          serviciosSucursalRows: [],
        })
      }}
    >
      <Grid item xs={12}>
        <Box
          component="form"
          display="flex"
          sx={{ mb: 2 }}
          onSubmit={(d) =>
            state.functions.agregarServiciosSucursal(
              d,
              app.functions.messageApi,
              state.setData,
              setServicioField
            )
          }
        >
          <FormControl variant="standard">
            <Autocomplete
              inputValue={servicioField}
              noOptionsText="Sin Datos"
              options={state.data.serviciosData}
              style={{ width: "50vmin" }}
              autoComplete
              includeInputInList
              getOptionLabel={(d: TServicioFormat) => d.nombre}
              onChange={(_, value) => {
                state.setData({ servicioId: value?.id ?? "" }, "assignData")
                setServicioField(value?.nombre ?? "")
              }}
              onInput={(d) => {
                const fD = d as any as { target: { value: string } }
                setServicioField(fD.target.value ?? "")
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={state.data.assignData.error}
                  label="Seleccione servicio"
                  variant="standard"
                />
              )}
            />
            {state.data.assignData.error && (
              <FormHelperText>Debe seleccionar un servicio.</FormHelperText>
            )}
          </FormControl>
          <Button
            size="small"
            type="submit"
            variant="outlined"
            sx={{ mb: 1, mt: 2, ml: 2 }}
          >
            Agregar
          </Button>
        </Box>
        <CustomTable
          getRowId={(r) => r.servicio.id}
          columns={state.functions.serviciosSucuralColumns(state.setData)}
          rows={state.data.serviciosSucursalRows}
        />
      </Grid>
    </Modal>
  )
}

export default VistaServiciosSucuralModal
