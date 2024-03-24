import { GridRowsProp } from "@mui/x-data-grid"
import { TTipoVehiculoDataFormat } from "@type/inversionista/TTarifaTipoVehiculo"

const useData = () => {
  const defaultValues = {
    tarifaRows: [] as GridRowsProp,
    tipoVehiculoData: [] as TTipoVehiculoDataFormat,
    errors: {
      tipoVehiculo: false,
      tarifa: 0,
    },
    createField: {
      tipoVehiculo: "",
      tarifa: "",
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    modifyMode: false,
  }
}

export default useData
