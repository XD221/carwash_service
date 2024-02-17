import useData from "@logistics/cuenta/login/loginData"
import useMethod from "@logistics/cuenta/login/loginMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseLogin = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}
