import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TData, TUseTarifaTipoVehiculo } from "@type/admin/TTarifaTipoVehiculo"
import { TFunctions } from "@type/default"
import { consultBackend } from "src/utils/helper"

const columns = () => {
  return [
    {
      field: "tipoVehiculo",
      headerName: "Tipo de Vehículo",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "tarifa",
      headerName: "Tarifa",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      type: "number",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) =>
        params.row.estado ? "Activo" : "Inactivo",
    },
  ] as GridColDef[]
}

const initialState = (
  setData: TUseTarifaTipoVehiculo["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  consultBackend("vehiculo/obtener-tarifa-tipo-vehiculo", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({ tarifaRows: data?.data })
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
  consultBackend("vehiculo/obtener-tipo-vehiculo", {
    params: {},
  })
    .then((response) => {
      response.json().then((data) => {
        if (data?.success) {
          setData({
            tipoVehiculoData: Object.values(data?.data ?? {}).map((p) => ({
              label: p,
              value: p,
            })),
          })
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
  const create_onFinish = (
    event: React.FormEvent<HTMLFormElement> | null,
    messageApi: TFunctions["messageApi"],
    setData: TUseTarifaTipoVehiculo["setData"]
  ) => {
    event?.preventDefault()
    let existError = false
    const errors = {
      tipoVehiculo: false,
      tarifa: 0,
    }
    if (data.createField.tipoVehiculo?.length === 0) errors.tipoVehiculo = true
    if (data.createField.tarifa?.length === 0) errors.tarifa = 1
    if (data.createField.tarifa?.slice(-1) === ".") errors.tarifa = 2
    for (const error in errors)
      if (errors[error as keyof typeof errors]) {
        existError = true
        break
      }
    setData(errors, "errors")
    if (!existError) {
      consultBackend("vehiculo/crear-tarifa", {
        params: data.createField,
      })
        .then((response) => {
          response.json().then((data) => {
            if (data?.success) {
              messageApi("La tarifa se registró exitosamente.", {
                type: "success",
              })
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
  return {
    columns,
    initialState,
    create_onFinish,
  }
}

export default useMethod
