import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import { TData, TUseServicios } from "@type/inversionista/TServicios"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser"

const initialState = (
  setData: TUseServicios["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  consultBackend("servicios/obtener", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({ serviciosRows: data?.data })
        } else {
          messageApi(data?.message, { type: "error" })
        }
      })
    })
    .catch((error) => {
      console.error("Error:", error)
      messageApi("El servicio no responde, intente más tarde.", {
        type: "error",
      })
    })
}

const useMethod = (data: TData) => {
  const columns = (
    messageApi: TFunctions["messageApi"],
    setData: TUseServicios["setData"]
  ) => {
    return [
      {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
      },
      {
        field: "precio",
        headerName: "Precio",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
      },
      {
        field: "estado",
        headerName: "Estado",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, Date>) =>
          params.row.estado ? "Activo" : "Inactivo",
      },
      {
        field: "action",
        headerName: "Acciones",
        type: "string",
        align: "center",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        maxWidth: 100,
        renderCell: (params: GridRenderCellParams<any, Date>) => (
          <>
            <Tooltip title="Modificar" arrow>
              <IconButton
                size="small"
                color="success"
                onClick={() =>
                  setData({
                    modifyMode: true,
                    addModalOpen: true,
                    createField: {
                      nombre: params.row.nombre,
                      precio: params.row.precio,
                      descripcion: params.row.descripcion,
                      id: params.row.id,
                    },
                  })
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={params.row.estado ? "Suspender" : "Habilitar"}
              arrow
            >
              <IconButton
                size="small"
                color={params.row.estado ? "error" : "warning"}
                onClick={(d) =>
                  setData(
                    { open: true, anchorEl: d.currentTarget },
                    "suspenderPopover"
                  )
                }
              >
                {params.row.estado ? <DeleteIcon /> : <OpenInBrowserIcon />}
              </IconButton>
            </Tooltip>
            <Popover
              open={data.suspenderPopover.open}
              onClose={() => setData({ open: false }, "suspenderPopover")}
              anchorEl={data.suspenderPopover.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography color="text.secondary" gutterBottom>
                    {params.row.estado
                      ? "¿Estás seguro que deseas suspender este servicio?"
                      : "¿Estás seguro que deseas habilitar este servicio?"}
                  </Typography>
                  <Button
                    onClick={() =>
                      params.row.estado
                        ? suspend_onClick(messageApi, setData, params.row.id)
                        : enable_onClick(messageApi, setData, params.row.id)
                    }
                  >
                    Si
                  </Button>
                  <Button
                    onClick={() => setData({ open: false }, "suspenderPopover")}
                  >
                    No
                  </Button>
                </CardContent>
              </Card>
            </Popover>
          </>
        ),
      },
    ] as GridColDef[]
  }

  // Create and modify
  const create_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseServicios["setData"]
  ) => {
    event?.preventDefault()
    let existError = false
    const errors = {
      nombre: false,
      precio: 0,
    }
    if (data.createField.nombre?.length === 0) errors.nombre = true
    if (data.createField.precio?.length === 0) errors.precio = 1
    if (data.createField.precio?.slice(-1) === ".") errors.precio = 2
    for (const error in errors)
      if (errors[error as keyof typeof errors]) {
        existError = true
        break
      }
    setData(errors, "errors")
    if (!existError) {
      consultBackend(
        data.modifyMode ? "servicios/modificar" : "servicios/agregar",
        {
          params: data.modifyMode
            ? data.createField
            : {
                nombre: data.createField.nombre,
                precio: data.createField.precio,
                descripcion: data.createField.descripcion,
              },
          requestType: "post",
        }
      )
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              messageApi(
                data.modifyMode
                  ? "El Servicio se modificó exitosamente."
                  : "El Servicio se registró exitosamente.",
                {
                  type: "success",
                }
              )
              setData({
                addModalOpen: false,
                createField: {
                  nombre: "",
                  precio: "",
                  descripcion: "",
                  id: "",
                },
              })
              initialState(setData, messageApi)
            } else {
              messageApi(response?.message, { type: "error" })
            }
          })
        })
        .catch((error) => {
          console.error("Error:", error)
          messageApi("El servicio no responde, intente más tarde.", {
            type: "error",
          })
        })
    }
  }
  const suspend_onClick = (
    messageApi: TFunctions["messageApi"],
    setData: TUseServicios["setData"],
    id: string
  ) => {
    consultBackend("servicios/suspender", {
      params: { id: id },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El Servicio se suspendio exitosamente.", {
              type: "success",
            })
            initialState(setData, messageApi)
          } else {
            messageApi(data?.message, { type: "error" })
          }
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        messageApi("El servicio no responde, intente más tarde.", {
          type: "error",
        })
      })
  }

  const enable_onClick = (
    messageApi: TFunctions["messageApi"],
    setData: TUseServicios["setData"],
    id: string
  ) => {
    consultBackend("servicios/habilitar", {
      params: { id: id },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El Servicio se habilitó exitosamente.", {
              type: "success",
            })
            initialState(setData, messageApi)
          } else {
            messageApi(data?.message, { type: "error" })
          }
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        messageApi("El servicio no responde, intente más tarde.", {
          type: "error",
        })
      })
  }
  return {
    columns,
    create_onFinish,
    initialState,
  }
}

export default useMethod
