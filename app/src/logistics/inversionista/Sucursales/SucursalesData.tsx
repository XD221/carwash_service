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
    suspendData: {
      estado: false,
      id: "",
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    createDireccionFieldFullWidth: false,
    sucursalesRows: [],
    modifyMode: false,
    suspenderPopover: { open: false, anchorEl: null },
  }
}

export default useData
