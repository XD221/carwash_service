import useData from "@logistics/persona/gestionPersona/GestionPersonaData"
import useMethod from "@logistics/persona/gestionPersona/GestionPersonaMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseGestionPersona = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}
