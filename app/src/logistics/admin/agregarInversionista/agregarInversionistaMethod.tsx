import { Button } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import {
  TData,
  TUseAgregarInversionista,
} from "@type/admin/TAgregarInversionista"
import { TFunctions } from "@type/default"
import { consultBackend, encryptText } from "src/utils/helper"

const peopleColumns = (setData: TUseAgregarInversionista["setData"]) => {
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
      field: "correo",
      headerName: "Correo",
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
      headerName: "Acción",
      align: "center",
      headerAlign: "left",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <strong>
          <Button
            variant="text"
            size="small"
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() =>
              setData(
                {
                  open: true,
                  text: `${params.row.nombre} ${params.row.apellido}`.trim(),
                  id: params.row.id,
                  ci: params.row.ci,
                },
                "dialog"
              )
            }
          >
            Seleccionar
          </Button>
        </strong>
      ),
    },
  ] as GridColDef[]
}

const useMethod = (data: TData) => {
  const buscar_onClick = (
    event: React.FormEvent<HTMLFormElement> | null,
    setData: TUseAgregarInversionista["setData"],
    messageApi: TFunctions["messageApi"]
  ) => {
    event?.preventDefault()
    let existError = false
    const { nombre, apellido, ci, telefono } = data.searchField
    if (!existError) {
      consultBackend("persona/buscar-no-inversionista", {
        params: {
          nombre: nombre,
          apellido: apellido,
          ci: ci,
          telefono: telefono,
        },
      })
        .then((response) => {
          response.json().then((data) => {
            if (data?.success) {
              setData({ peopleRows: data?.data })
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
  const tabsChange = (
    event: React.SyntheticEvent,
    newValue: number,
    setData: TUseAgregarInversionista["setData"]
  ) => {
    setData({ tabsValue: newValue })
  }

  const crearInversionista_onClick = async (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseAgregarInversionista["setData"]
  ) => {
    event?.preventDefault()
    const params = await {
      ci: data.createField.ci,
      nombre: data.createField.nombre,
      apellido: data.createField.apellido,
      telefono: data.createField.telefono,
      direccion: data.createField.direccion,
      correo: data.createField.correo,
      password: await encryptText(data.createField.ci),
    }
    consultBackend("inversionista/agregar", {
      params,
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            messageApi("Se agregó al usuario exitosamente.", {
              type: "success",
            })
            setData(
              {
                ci: "",
                nombre: "",
                apellido: "",
                telefono: "",
                direccion: "",
                correo: "",
              },
              "createField"
            )
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
  const crearInversionista_personaExistente_onClick = async (
    messageApi: TFunctions["messageApi"],
    setData: TUseAgregarInversionista["setData"]
  ) => {
    const params = await {
      id: `${data.dialog.id}`,
      password: await encryptText(data.dialog.ci),
    }
    consultBackend("inversionista/agregar-persona-existente", {
      params,
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            messageApi("Se creó el usuario exitosamente.", {
              type: "success",
            })
            buscar_onClick(null, setData, messageApi)
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
    crearInversionista_onClick,
    crearInversionista_personaExistente_onClick,
    tabsChange,
    peopleColumns,
    buscar_onClick,
  }
}

export default useMethod
