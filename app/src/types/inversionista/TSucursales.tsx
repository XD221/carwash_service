import useData from "@logistics/inversionista/Sucursales/SucursalesData"
import useMethod from "@logistics/inversionista/Sucursales/SucursalesMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseSucursales = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}
