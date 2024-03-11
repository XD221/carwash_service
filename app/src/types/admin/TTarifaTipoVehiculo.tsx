import useData from "@logistics/admin/tarifaTipoVehiculo/tarifaTipoVehiculoData"
import useMethod from "@logistics/admin/tarifaTipoVehiculo/tarifaTipoVehiculoMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseTarifaTipoVehiculo = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}

export type TTipoVehiculoDataFormat = Array<{ label: string; value: string }>
