import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import { TData, TUseSucursales } from "@type/inversionista/TSucursales"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser"

const initialState = (
  setData: TUseSucursales["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  consultBackend("sucursales/obtener", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({ sucursalesRows: data?.data })
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
  const columns = (setData: TUseSucursales["setData"]) => {
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
        field: "direccion",
        headerName: "Dirección",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
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
                      direccion: params.row.direccion,
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
                  setData({
                    suspenderPopover: { open: true, anchorEl: d.currentTarget },
                    suspendData: {
                      estado: params.row.estado,
                      id: params.row.id,
                    },
                  })
                }
              >
                {params.row.estado ? <DeleteIcon /> : <OpenInBrowserIcon />}
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ] as GridColDef[]
  }

  // Create and modify
  const create_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseSucursales["setData"]
  ) => {
    event?.preventDefault()
    let existError = false
    const errors = {
      nombre: false,
      precio: 0,
    }
    if (data.createField.nombre?.length === 0) errors.nombre = true
    for (const error in errors)
      if (errors[error as keyof typeof errors]) {
        existError = true
        break
      }
    setData(errors, "errors")
    if (!existError) {
      consultBackend(
        data.modifyMode ? "sucursales/modificar" : "sucursales/agregar",
        {
          params: data.modifyMode
            ? data.createField
            : {
                nombre: data.createField.nombre,
                direccion: data.createField.direccion,
              },
          requestType: "post",
        }
      )
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              messageApi(
                data.modifyMode
                  ? "El Sucursal se modificó exitosamente."
                  : "El Sucursal se registró exitosamente.",
                {
                  type: "success",
                }
              )
              setData({
                addModalOpen: false,
                createField: {
                  nombre: "",
                  direccion: "",
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
    setData: TUseSucursales["setData"],
    id: string
  ) => {
    consultBackend("sucursales/suspender", {
      params: { id: id },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El Sucursal se suspendio exitosamente.", {
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
    setData: TUseSucursales["setData"],
    id: string
  ) => {
    consultBackend("sucursales/habilitar", {
      params: { id: id },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El Sucursal se habilitó exitosamente.", {
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
        messageApi("El sucursal no responde, intente más tarde.", {
          type: "error",
        })
      })
  }
  return {
    columns,
    create_onFinish,
    suspend_onClick,
    enable_onClick,
    initialState,
  }
}

export default useMethod
