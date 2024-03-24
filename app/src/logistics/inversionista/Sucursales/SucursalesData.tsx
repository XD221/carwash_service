const useData = () => {
  const defaultValues = {
    errors: {
      nombre: false,
    },
    createField: {
      nombre: "",
      direccion: "",
      id: "", // Only modify Mode
    },
    assignData: {
      open: false,
      loading: false,
      error: false,
      id: "",
      servicioId: "",
    },
    suspendData: {
      message: "",
      estado: false,
      id: "",
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    createDireccionFieldFullWidth: false,
    sucursalesRows: [],
    serviciosData: [],
    serviciosSucursalRows: [],
    modifyMode: false,
    suspenderPopover: { open: false, anchorEl: null },
  }
}

export default useData
