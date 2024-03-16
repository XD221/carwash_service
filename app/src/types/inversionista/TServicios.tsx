import useData from "@logistics/inversionista/Servicios/ServiciosData"
import useMethod from "@logistics/inversionista/Servicios/ServiciosMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseServicios = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}
