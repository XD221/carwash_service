import useData from "@logistics/inversionista/tarifaTipoVehiculo/tarifaTipoVehiculoData"
import useMethod from "@logistics/inversionista/tarifaTipoVehiculo/tarifaTipoVehiculoMethod"

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
