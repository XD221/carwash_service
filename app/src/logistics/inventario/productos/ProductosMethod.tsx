import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import { TData, TUseProductos } from "@type/inventario/TProductos"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"

const initialState = (
  setData: TUseProductos["setData"],
  messageApi: TFunctions["messageApi"]
) => {
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

const useMethod = (data: TData) => {
  const columns = (setData: TUseProductos["setData"]) => {
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
              onClick={() =>
                setData({
                  modifyMode: true,
                  addModalOpen: true,
                  createField: {
                    nombre: params.row.nombre,
                    precio: params.row.precio,
                    id: params.row.id,
                  },
                })
              }
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
    setData: TUseProductos["setData"]
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
        data.modifyMode ? "productos/modificar" : "productos/agregar",
        {
          params: data.modifyMode
            ? data.createField
            : {
                nombre: data.createField.nombre,
                precio: data.createField.precio,
              },
          requestType: "post",
        }
      )
        .then((response) => {
          response.json().then((response) => {
            if (response?.success) {
              messageApi(
                data.modifyMode
                  ? "El producto se modificó exitosamente."
                  : "El producto se registró exitosamente.",
                {
                  type: "success",
                }
              )
              setData({
                addModalOpen: false,
                createField: {
                  nombre: "",
                  precio: "0",
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

  return {
    columns,
    create_onFinish,
    initialState,
  }
}

export default useMethod
