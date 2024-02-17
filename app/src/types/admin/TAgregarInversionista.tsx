import useData from "@logistics/admin/agregarInversionista/agregarInversionistaData"
import useMethod from "@logistics/admin/agregarInversionista/agregarInversionistaMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseAgregarInversionista = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}
