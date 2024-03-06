import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { TData } from "@type/admin/TTarifaTipoVehiculo"

const columns = () => {
  return [
    {
      field: "tipoVehiculo",
      headerName: "Tipo de Vehículo",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "tarofa",
      headerName: "Tarifa",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      type: "string",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      type: "number",
      align: "left",
      headerAlign: "left",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) =>
        params.row.estado ? "Activo" : "Inactivo",
    },
  ] as GridColDef[]
}

const useMethod = (data: TData) => {
  return {
    columns,
  }
}

export default useMethod
