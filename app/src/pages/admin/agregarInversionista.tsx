import CustomTable from "@component/CustomTable"
import { useTheme } from "@mui/material/styles"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material"
import { useAgregarInversionista } from "src/context/AdminContext"
import { useApp } from "src/context/AppContext"
import { restrictAllowOnlyNumber } from "src/utils/helper"

const AgregarInversionista = () => {
  const state = useAgregarInversionista()
  const app = useApp()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
      <Card elevation={4}>
        <CardHeader
          style={{ textAlign: "center" }}
          title="Agregar Inversionista"
        />
        <CardContent>
          <Box my={1} display="flex" flexDirection="column" alignItems="center">
            <Tabs
              value={state.data.tabsValue}
              onChange={(event, newValue) =>
                state.functions.tabsChange(event, newValue, state.setData)
              }
            >
              <Tab
                label="Registrar Nueva Persona"
                id="tab1"
                value="tab1"
                aria-labelledby="tab1-content"
              />
              <Tab
                label="Buscar Persona Existente"
                id="tab2"
                value="tab2"
                aria-labelledby="tab2-content"
              />
            </Tabs>
          </Box>
          <Grid container spacing={2}>
            {state.data.tabsValue === "tab1" && (
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
                          state.setData(
                            { nombre: d.target.value },
                            "createField"
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel>Apellido</InputLabel>
                      <Input
                        value={state.data.createField.apellido}
                        inputProps={{ maxLength: 40 }}
                        onChange={(d) =>
                          state.setData(
                            { apellido: d.target.value },
                            "createField"
                          )
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
                          state.setData(
                            { telefono: d.target.value },
                            "createField"
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel>Correo</InputLabel>
                      <Input
                        value={state.data.createField.correo}
                        inputProps={{ maxLength: 60 }}
                        onChange={(d) =>
                          state.setData(
                            { correo: d.target.value },
                            "createField"
                          )
                        }
                      />
                    </FormControl>
                    <FormControl
                      fullWidth={state.data.createDireccionFieldFullWidth}
                    >
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
                          state.setData(
                            { direccion: d.target.value },
                            "createField"
                          )
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
            )}
            {state.data.tabsValue === "tab2" && (
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
                          state.setData(
                            { nombre: d.target.value },
                            "searchField"
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel>Apellido</InputLabel>
                      <Input
                        onChange={(d) =>
                          state.setData(
                            { apellido: d.target.value },
                            "searchField"
                          )
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
                          state.setData(
                            { telefono: d.target.value },
                            "searchField"
                          )
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
            )}
          </Grid>
        </CardContent>
      </Card>
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

export default AgregarInversionista
