const useData = () => {
  const defaultValues = {
    errors: {
      nombre: false,
      precio: false,
    },
    createField: {
      nombre: "",
      precio: "0",
      id: "", // Only modify Mode
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    productosRows: [],
    modifyMode: false,
  }
}

export default useData
