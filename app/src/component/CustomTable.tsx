import {
  GridRowsProp,
  // GridRowModesModel,
  // GridRowModes,
  DataGrid,
  DataGridProps,
  GridColDef,
  // GridToolbarContainer,
  // GridActionsCellItem,
  // GridEventListener,
  // GridRowId,
  // GridRowModel,
  // GridRowEditStopReasons,
  esES,
} from "@mui/x-data-grid"

const CustomTable = ({
  columns,
  rows,
  ...props
}: DataGridProps & {
  rows: GridRowsProp
  columns: GridColDef[]
}) => {
  return (
    <DataGrid
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      // hideFooter={true}
      autoHeight
      rowHeight={40}
      columnHeaderHeight={30}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      {...props}
    />
  )
}

export default CustomTable
