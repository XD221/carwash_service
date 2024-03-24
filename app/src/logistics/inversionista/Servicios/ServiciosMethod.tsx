import { IconButton, Tooltip } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import { TData, TUseServicios } from "@type/inversionista/TServicios"
import { consultBackend } from "src/utils/helper"
import EditIcon from "@mui/icons-material/Edit"

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
  const columns = (setData: TUseServicios["setData"]) => {
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
  return {
    columns,
    create_onFinish,
    initialState,
  }
}

export default useMethod
