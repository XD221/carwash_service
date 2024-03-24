import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tab,
  Tabs,
} from "@mui/material"
import { useAgregarInversionista } from "src/context/AdminContext"
import { useApp } from "src/context/AppContext"
import RegistrarNuevaPersona from "./agregarInversionista/registrarNuevaPersona"
import BuscarPersonaExistente from "./agregarInversionista/buscarPersonaExistente"

const AgregarInversionista = () => {
  const state = useAgregarInversionista()
  const app = useApp()
  return (
    <Card elevation={4}>
      <CardHeader
        style={{ textAlign: "center" }}
        title="Agregar inversionista"
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
            <RegistrarNuevaPersona app={app} state={state} />
          )}
          {state.data.tabsValue === "tab2" && (
            <BuscarPersonaExistente app={app} state={state} />
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AgregarInversionista
