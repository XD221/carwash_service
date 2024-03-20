import { getUserInfo } from "src/utils/helper"

const useData = () => {
  const defaultValues = {
    errors: {
      producto: false,
    },
    createField: {
      producto: "",
      cant_init: "0",
    },
    sucursalId: 0, // Used only when a inversionista
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    productosRows: [],
    sucursalesRows: [],
    inventarioRows: [],
    userInfo: getUserInfo(),
  }
}

export default useData
