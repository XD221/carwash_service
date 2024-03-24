import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser"
import AddIcon from "@mui/icons-material/Add"
import { TFunctions } from "@type/default"
import {
  TData,
  TUseGestionInventario,
} from "@type/inventario/TGestionInventario"
import { consultBackend } from "src/utils/helper"

const beforeInitialState = (
  setData: TUseGestionInventario["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  consultBackend("sucursales/obtener", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({ sucursalData: data?.data })
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
  const initialState = (
    setData: TUseGestionInventario["setData"],
    messageApi: TFunctions["messageApi"]
  ) => {
    consultBackend("inventario/obtener", {
      params:
        data.userInfo.role === "INVERSIONISTA"
          ? { sucursalId: data.sucursalId.toString() }
          : {},
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ inventarioRows: data?.data })
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
    consultBackend("productos/obtener", {
      params: {},
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ productosRows: data?.data })
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

  const suspend_onClick = (
    messageApi: TFunctions["messageApi"],
    setData: TUseGestionInventario["setData"],
    id: string
  ) => {
    consultBackend("inventario/suspender", {
      params: { id: id, sucursalId: data.sucursalId.toString() },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El producto se suspendio exitosamente.", {
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
    setData: TUseGestionInventario["setData"],
    id: string
  ) => {
    consultBackend("inventario/habilitar", {
      params: { id: id, sucursalId: data.sucursalId.toString() },
      requestType: "post",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ open: false }, "suspenderPopover")
            messageApi("El producto se habilitó exitosamente.", {
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

  const columns = (setData: TUseGestionInventario["setData"]) => {
    return [
      {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        valueGetter: (params) => params.row?.producto?.nombre,
      },
      {
        field: "precio",
        headerName: "Precio Unitario",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        valueGetter: (params) => params.row?.producto?.precio,
      },
      {
        field: "cantidad",
        headerName: "Cantidad",
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
            <Tooltip title="Incrementar stock" arrow>
              <IconButton
                size="small"
                color="info"
                onClick={(_) =>
                  setData({
                    createField: {
                      producto: {
                        id: params.row.producto.id,
                        nombre: params.row.producto.nombre,
                        precio: params.row.producto.precio,
                      },
                      productoId: `${params.row.producto.id}`,
                      cant_init: "0",
                    },
                    increasedStockMode: true,
                    addModalOpen: true,
                  })
                }
              >
                <AddIcon />
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

  const increasedStock_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseGestionInventario["setData"]
  ) => {
    event?.preventDefault()
    if (data.createField.cant_init !== "0") {
      consultBackend("inventario/incrementarStock", {
        params:
          data.userInfo.role === "INVERSIONISTA"
            ? {
                productoId: data.createField.productoId,
                cant_init: data.createField.cant_init,
                sucursalId: data.sucursalId.toString(),
              }
            : {
                productoId: data.createField.productoId,
                cant_init: data.createField.cant_init,
              },
        requestType: "post",
      })
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              messageApi("Se incremento el stock exitosamente.", {
                type: "success",
              })
              setData({
                addModalOpen: false,
                createField: {
                  producto: "",
                  cant_init: "",
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
    } else {
      messageApi("La cantidad debe ser mayor a 0.", {
        type: "error",
      })
    }
  }

  // Create and modify
  const create_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseGestionInventario["setData"]
  ) => {
    event?.preventDefault()
    let existError = false
    const errors = {
      productoId: false,
    }
    if (data.createField.productoId?.length === 0) errors.productoId = true
    for (const error in errors)
      if (errors[error as keyof typeof errors]) {
        existError = true
        break
      }
    setData(errors, "errors")
    if (!existError) {
      consultBackend("inventario/agregar", {
        params:
          data.userInfo.role === "INVERSIONISTA"
            ? {
                productoId: data.createField.productoId,
                cant_init: data.createField.cant_init,
                sucursalId: data.sucursalId.toString(),
              }
            : {
                productoId: data.createField.productoId,
                cant_init: data.createField.cant_init,
              },
        requestType: "post",
      })
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              messageApi(
                "El producto se registró exitosamente al inventario.",
                {
                  type: "success",
                }
              )
              setData({
                addModalOpen: false,
                createField: {
                  producto: "",
                  cant_init: "",
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

  return {
    columns,
    create_onFinish,
    increasedStock_onFinish,
    initialState,
    beforeInitialState,
    suspend_onClick,
    enable_onClick,
  }
}

export default useMethod
