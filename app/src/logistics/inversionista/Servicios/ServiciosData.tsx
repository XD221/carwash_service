const useData = () => {
  const defaultValues = {
    errors: {
      nombre: false,
      precio: 0,
    },
    createField: {
      nombre: "",
      precio: "",
      descripcion: "",
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
    createDescripcionFieldFullWidth: false,
    serviciosRows: [],
    modifyMode: false,
    suspenderPopover: { open: false, anchorEl: null },
  }
}

export default useData