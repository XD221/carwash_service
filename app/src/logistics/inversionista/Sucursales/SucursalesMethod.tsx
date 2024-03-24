import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TContextData, TFunctions } from "@type/default"
import { TData, TUseSucursales } from "@type/inversionista/TSucursales"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser"
import AssignmentIcon from "@mui/icons-material/Assignment"

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
  const suspendServicio_onClick = (
    messageApi: TFunctions["messageApi"],
    setData: TUseSucursales["setData"]
  ) => {
    consultBackend("servicios/suspender", {
      params: {
        servicioId: data.suspendData.id.toString(),
        sucursalId: data.assignData.id.toString(),
      },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((response) => {
          if (response?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El servicio se suspendio exitosamente.", {
              type: "success",
            })
            serviciosSucursal_initialState(
              setData,
              messageApi,
              Number(data.assignData.id)
            )
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

  const enableServicio_onClick = (
    messageApi: TFunctions["messageApi"],
    setData: TUseSucursales["setData"]
  ) => {
    consultBackend("servicios/habilitar", {
      params: {
        servicioId: data.suspendData.id.toString(),
        sucursalId: data.assignData.id.toString(),
      },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((response) => {
          if (response?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El servicio se habilitó exitosamente.", {
              type: "success",
            })
            serviciosSucursal_initialState(
              setData,
              messageApi,
              Number(data.assignData.id)
            )
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
  const agregarServiciosSucursal = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseSucursales["setData"],
    setServicioField: Function
  ) => {
    event?.preventDefault()
    let error = false
    if (data.assignData.servicioId === "") error = true
    if (error !== data.assignData.error)
      setData({ error, loading: !error }, "assignData")
    if (!error) {
      consultBackend("servicios/agregarServicioSucursal", {
        requestType: "post",
        params: {
          sucursalId: data.assignData.id.toString(),
          servicioId: data.assignData.servicioId.toString(),
        },
      })
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              serviciosSucursal_initialState(
                setData,
                messageApi,
                Number(data.assignData.id)
              )
              setServicioField("")
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
    //
  }

  const serviciosSucursal_initialState = (
    setData: TUseSucursales["setData"],
    messageApi: TFunctions["messageApi"],
    sucursalId: number
  ) => {
    consultBackend("servicios/obtenerServiciosSucursal", {
      params: { sucursalId: sucursalId.toString() },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ serviciosSucursalRows: data?.data })
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
    if (data.serviciosData.length === 0) {
      consultBackend("servicios/obtener", {
        params: { sucursalId: sucursalId.toString() },
      })
        .then((response) => {
          response.json().then((data) => {
            if (data?.success) {
              setData({ serviciosData: data?.data })
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
  }

  const columns = (
    setData: TUseSucursales["setData"],
    messageApi: TFunctions["messageApi"]
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
        field: "direccion",
        headerName: "Dirección",
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
        maxWidth: 110,
        renderCell: (params: GridRenderCellParams<any, Date>) => (
          <>
            <Tooltip title="Ver servicios" arrow>
              <IconButton
                size="small"
                color="info"
                onClick={() => {
                  setData(
                    {
                      open: true,
                      id: params.row.id.toString(),
                    },
                    "assignData"
                  )
                  serviciosSucursal_initialState(
                    setData,
                    messageApi,
                    params.row.id
                  )
                }}
              >
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
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
                {params.row.estado ? (
                  <RemoveCircleOutlineIcon />
                ) : (
                  <OpenInBrowserIcon />
                )}
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ] as GridColDef[]
  }

  const serviciosSucuralColumns = (setData: TUseSucursales["setData"]) => {
    return [
      {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, Date>) =>
          params.row.servicio.nombre,
      },
      {
        field: "precio",
        headerName: "Precio",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, Date>) =>
          params.row.servicio.precio,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, Date>) =>
          params.row.servicio.descripcion,
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
                      id: params.row.servicio.id,
                    },
                  })
                }
              >
                {params.row.estado ? (
                  <RemoveCircleOutlineIcon />
                ) : (
                  <OpenInBrowserIcon />
                )}
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
                  ? "La sucursal se modificó exitosamente."
                  : "La sucursal se registró exitosamente.",
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
            messageApi("La sucursal se suspendio exitosamente.", {
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
            messageApi("La sucursal se habilitó exitosamente.", {
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
    serviciosSucuralColumns,
    create_onFinish,
    suspend_onClick,
    enable_onClick,
    suspendServicio_onClick,
    enableServicio_onClick,
    initialState,
    serviciosSucursal_initialState,
    agregarServiciosSucursal,
  }
}

export default useMethod
