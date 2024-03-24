import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TFunctions } from "@type/default"
import { consultBackend } from "src/utils/helper"
import { TData, TUseGestionPersona } from "@type/persona/TGestionPersona"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Tooltip } from "@mui/material"

const columns = (
  setData: TUseGestionPersona["setData"],
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
      field: "apellido",
      headerName: "Apellido",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "ci",
      headerName: "CI",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "Telefono",
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
      maxWidth: 80,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <>
          <Tooltip title="Ver servicios" arrow>
            <IconButton
              size="small"
              color="success"
              onClick={() =>
                setData({
                  modifyMode: true,
                  addModalOpen: true,
                  createField: {
                    nombre: params.row.nombre,
                    apellido: params.row.apellido,
                    ci: params.row.ci,
                    telefono: params.row.telefono.toString(),
                    correo: params.row.correo,
                    direccion: params.row.direccion,
                    id: params.row.id.toString(),
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

const initialState = (
  setData: TUseGestionPersona["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  consultBackend("persona/obtener", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({ personaRows: data?.data })
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
  const search_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseGestionPersona["setData"]
  ) => {
    event?.preventDefault()
    consultBackend("persona/obtener", {
      params: {
        nombre: data.searchField.nombre,
        apellido: data.searchField.apellido,
        ci: data.searchField.ci,
        telefono: data.searchField.telefono,
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setData({ personaRows: data?.data })
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

  const create_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseGestionPersona["setData"]
  ) => {
    event?.preventDefault()
    let existError = false
    const errors = {
      nombre: false,
      apellido: false,
      ci: false,
    }
    if (data.createField.nombre?.length === 0) errors.nombre = true
    if (data.createField.apellido?.length === 0) errors.apellido = true
    if (data.createField.ci.length === 0) errors.ci = true
    for (const error in errors)
      if (errors[error as keyof typeof errors]) {
        existError = true
        break
      }
    setData(errors, "errors")
    if (!existError) {
      consultBackend(
        data.modifyMode ? "persona/modificar" : "persona/agregar",
        {
          params: data.modifyMode
            ? data.createField
            : {
                nombre: data.createField.nombre,
                apellido: data.createField.apellido,
                ci: data.createField.ci,
                telefono: data.createField.telefono,
                correo: data.createField.correo,
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
                  ? "La persona se modificó exitosamente."
                  : "La persona se registró exitosamente.",
                {
                  type: "success",
                }
              )
              setData({
                addModalOpen: false,
                createField: {
                  nombre: "",
                  apellido: "",
                  ci: "",
                  telefono: "",
                  correo: "",
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
  return {
    columns,
    initialState,
    create_onFinish,
    search_onFinish,
  }
}

export default useMethod
