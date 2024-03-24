import CustomButton from "@component/CustomButtom"
import CustomTable from "@component/CustomTable"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Input,
} from "@mui/material"
import { TContextData } from "@type/default"
import { TUseGestionPersona } from "@type/persona/TGestionPersona"
import { restrictAllowOnlyNumber } from "src/utils/helper"

const VistaPrincipal = ({
  state,
  app,
}: {
  state: TUseGestionPersona
  app: TContextData
}) => {
  return (
    <Card>
      <CardHeader style={{ textAlign: "center" }} title="Gestión de Personas" />
      <CardContent>
        <Box
          my={1}
          component="form"
          display="flex"
          flexDirection="row"
          gap={2}
          id="barra_filtro"
          onSubmit={(d) => {
            state.functions.search_onFinish(
              d,
              app.functions.messageApi,
              state.setData
            )
          }}
        >
          <FormControl>
            <Input
              value={state.data.searchField.nombre}
              inputProps={{ maxLength: 35 }}
              placeholder="Nombre"
              onChange={(d) =>
                state.setData({ nombre: d.target.value }, "searchField")
              }
            />
          </FormControl>
          <FormControl>
            <Input
              value={state.data.searchField.apellido}
              inputProps={{ maxLength: 40 }}
              placeholder="Apellido"
              onChange={(d) =>
                state.setData({ apellido: d.target.value }, "searchField")
              }
            />
          </FormControl>
          <FormControl>
            <Input
              value={state.data.searchField.ci}
              inputProps={{ maxLength: 15 }}
              placeholder="CI"
              onChange={(d) =>
                state.setData({ ci: d.target.value }, "searchField")
              }
            />
          </FormControl>
          <FormControl>
            <Input
              value={state.data.searchField.telefono}
              inputProps={{ maxLength: 11 }}
              onInput={(d) => restrictAllowOnlyNumber(d)}
              placeholder="Telefono"
              onChange={(d) =>
                state.setData({ telefono: d.target.value }, "searchField")
              }
            />
          </FormControl>
          <FormControl>
            <CustomButton
              loading={state.data.searchField.loading}
              size="small"
              type="submit"
              variant="contained"
            >
              Buscar
            </CustomButton>
          </FormControl>
        </Box>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() =>
              state.setData({
                addModalOpen: !state.data.addModalOpen,
                modifyMode: false,
              })
            }
          >
            Agregar
          </Button>
        </div>
        <CustomTable
          columns={state.functions.columns(
            state.setData,
            app.functions.messageApi
          )}
          rows={state.data.personaRows}
        />
      </CardContent>
    </Card>
  )
}

export default VistaPrincipal
