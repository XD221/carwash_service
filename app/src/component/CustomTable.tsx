import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid"

const CustomTable = ({
  columns,
  rows,
  ...props
}: {
  rows: GridRowsProp
  columns: GridColDef[]
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter={true}
      rowHeight={40}
      columnHeaderHeight={30}
      {...props}
      // rowModesModel={rowModesModel}
      // onRowModesModelChange={handleRowModesModelChange}
      // onRowEditStop={handleRowEditStop}
      // processRowUpdate={processRowUpdate}
      // slots={{
      //   toolbar: EditToolbar,
      // }}
      // slotProps={{
      //   toolbar: { setRows, setRowModesModel },
      // }}
    />
  )
}

export default CustomTable
