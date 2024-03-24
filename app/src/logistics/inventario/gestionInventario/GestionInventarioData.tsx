import { getUserInfo } from "src/utils/helper"

const useData = () => {
  const defaultValues = {
    errors: {
      productoId: false,
    },
    createField: {
      producto: undefined,
      productoId: "",
      cant_init: "0",
    },
    suspendData: {
      estado: false,
      id: "",
    },
    sucursalId: 0, // Used only when a inversionista
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    increasedStockMode: false,
    productosRows: [],
    sucursalData: [],
    inventarioRows: [],
    suspenderPopover: { open: false, anchorEl: null },
    userInfo: getUserInfo(),
  }
}

export default useData
