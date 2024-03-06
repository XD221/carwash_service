import CustomTable from "@component/CustomTable"
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { TUseAgregarInversionista } from "@type/admin/TAgregarInversionista"
import { TContextData } from "@type/default"

const BuscarPersonaExistente = ({
  state,
  app,
}: {
  state: TUseAgregarInversionista
  app: TContextData
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
      <Grid item xs={12}>
        <div id="tab2-content" role="tabpanel" aria-labelledby="tab2">
          <Box
            my={1}
            component="form"
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            onSubmit={(d) =>
              state.functions.buscar_onClick(
                d,
                state.setData,
                app.functions.messageApi
              )
            }
          >
            <FormControl role="form" id="nombre">
              <InputLabel>Nombre</InputLabel>
              <Input
                onChange={(d) =>
                  state.setData({ nombre: d.target.value }, "searchField")
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Apellido</InputLabel>
              <Input
                onChange={(d) =>
                  state.setData({ apellido: d.target.value }, "searchField")
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>CI</InputLabel>
              <Input
                onChange={(d) =>
                  state.setData({ ci: d.target.value }, "searchField")
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Telefono</InputLabel>
              <Input
                onChange={(d) =>
                  state.setData({ telefono: d.target.value }, "searchField")
                }
              />
            </FormControl>
            <FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Buscar
              </Button>
            </FormControl>
          </Box>
          <CustomTable
            columns={state.functions.peopleColumns(state.setData)}
            rows={state.data.peopleRows}
          />
        </div>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={state.data.dialog.open}
        onClose={() => state.setData({ open: false }, "dialog")}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Confirmación de Acceptación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estas seguro que deseas convertir a "{state.data.dialog.text}" en
            inversionista?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => state.setData({ open: false }, "dialog")}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              state.setData({ open: false }, "dialog")
              state.functions.crearInversionista_personaExistente_onClick(
                app.functions.messageApi,
                state.setData
              )
            }}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BuscarPersonaExistente
