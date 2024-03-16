import { GridRowsProp } from "@mui/x-data-grid"
import { TTipoVehiculoDataFormat } from "@type/inversionista/TTarifaTipoVehiculo"

const modalStyle = {
  position: "fixed",
  zIndex: 1300,
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

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
    modalStyle,
  }
}

export default useData
