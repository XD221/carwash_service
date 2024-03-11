import { GridRowsProp } from "@mui/x-data-grid"
import { TTipoVehiculoDataFormat } from "@type/admin/TTarifaTipoVehiculo"

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
      tarifa: false,
    },
    createField: {
      tipoVehiculo: "",
      tarifa: 0,
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    modalStyle,
  }
}

export default useData
