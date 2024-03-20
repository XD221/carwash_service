import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import {
  TData,
  TUseGestionInventario,
} from "@type/inventario/TGestionInventario"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"

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
      },
      {
        field: "precio_unitario",
        headerName: "Precio Unitario",
        type: "string",
        align: "left",
        headerAlign: "left",
        sortable: false,
        flex: 1,
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
        field: "action",
        headerName: "Acciones",
        type: "string",
        align: "center",
        headerAlign: "left",
        sortable: false,
        flex: 1,
        maxWidth: 100,
        renderCell: (params: GridRenderCellParams<any, Date>) => (
          <Tooltip title="Modificar" arrow>
            <IconButton
              size="small"
              color="success"
              // onClick={() =>
              //   setData({
              //     modifyMode: true,
              //     addModalOpen: true,
              //     createField: {
              //       producto: params.row.producto,
              //       cant_init: params.row.cantidad,
              //     },
              //   })
              // }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ] as GridColDef[]
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
      producto: false,
    }
    if (data.createField.producto?.length === 0) errors.producto = true
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
            ? { ...data.createField, sucursalId: data.sucursalId.toString() }
            : data.createField,
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
    initialState,
    beforeInitialState,
  }
}

export default useMethod
