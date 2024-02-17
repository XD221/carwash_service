import { GridColDef, GridRowsProp } from "@mui/x-data-grid"

const useData = () => {
  const defaultValues = {
    errors: {
      ci: false,
      nombre: false,
      telefono: false,
    },
    peopleRows: [] as GridRowsProp,
    peopleColumns: [
      {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "apellido",
        headerName: "Apellido",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "ci",
        headerName: "CI",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "telefono",
        headerName: "Telefono",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "correo",
        headerName: "Correo",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "direccion",
        headerName: "Dirección",
        type: "string",
        align: "left",
        headerAlign: "left",
      },
    ] as GridColDef[],
  }
  return {
    ...defaultValues,
  }
}

export default useData
