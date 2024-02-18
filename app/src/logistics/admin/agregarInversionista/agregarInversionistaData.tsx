import { GridRowsProp } from "@mui/x-data-grid"

const useData = () => {
  const defaultValues = {
    errors: {
      ci: false,
      nombre: false,
      telefono: false,
    },
    peopleRows: [] as GridRowsProp,
    tabsValue: "tab1",
    dialog: {
      open: false,
      text: "",
      id: 0,
      ci: "",
    },
    createField: {
      ci: "",
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      correo: "",
    },
    createDireccionFieldFullWidth: false,
    searchField: {
      nombre: "",
      apellido: "",
      ci: "",
      telefono: "",
    },
  }
  return {
    ...defaultValues,
  }
}

export default useData
