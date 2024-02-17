import CustomTable from "@component/CustomTable"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Tab,
  Tabs,
} from "@mui/material"
import { useAgregarInversionista } from "src/context/AdminContext"

const AgregarInversionista = () => {
  const state = useAgregarInversionista()
  return (
    <Card elevation={4}>
      <CardHeader
        style={{ textAlign: "center" }}
        title="Agregar Inversionista"
      />
      <CardContent>
        <Box my={1} display="flex" flexDirection="column" alignItems="center">
          <Tabs>
            <Tab label="Registrar Nueva Persona" />
            <Tab label="Buscar Persona Existente" />
          </Tabs>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              my={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <FormControl>
                <InputLabel required>CI</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel required>Nombre</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Apellido</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel required>Telefono</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Dirección</InputLabel>
                <Input />
              </FormControl>
              <FormControl>
                <InputLabel>Correo</InputLabel>
                <Input />
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
          </Grid>
          <Grid item xs={6}>
            <CustomTable
              columns={state.data.peopleColumns}
              rows={state.data.peopleRows}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AgregarInversionista
