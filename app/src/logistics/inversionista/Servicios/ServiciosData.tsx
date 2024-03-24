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
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    createDescripcionFieldFullWidth: false,
    serviciosRows: [],
    modifyMode: false,
  }
}

export default useData
