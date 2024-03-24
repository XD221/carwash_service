import { GridRowsProp } from "@mui/x-data-grid"

const useData = () => {
  const defaultValues = {
    personaRows: [] as GridRowsProp,
    errors: {
      nombre: false,
      apellido: false,
      ci: false,
    },
    createField: {
      nombre: "",
      apellido: "",
      telefono: "",
      ci: "",
      correo: "",
      direccion: "",
      id: "", // only edit mode
    },
    searchField: {
      nombre: "",
      apellido: "",
      ci: "",
      telefono: "",
      loading: false,
    },
  }
  return {
    ...defaultValues,
    addModalOpen: false,
    modifyMode: false,
    createDireccionFieldFullWidth: false,
  }
}

export default useData
