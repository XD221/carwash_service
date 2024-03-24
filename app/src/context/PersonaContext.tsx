import {
  TUseGestionPersona,
  TData as TData_gestionPersona,
} from "@type/persona/TGestionPersona"
import useData_gestionPersona from "@logistics/persona/gestionPersona/GestionPersonaData"
import useMethod_gestionPersona from "@logistics/persona/gestionPersona/GestionPersonaMethod"
import { create } from "zustand"

export const useGestionPersona = create<TUseGestionPersona>((set) => {
  const data = useData_gestionPersona()
  const functions = useMethod_gestionPersona(data)
  return {
    data,
    functions,
    setData: (
      data: Partial<TData_gestionPersona> | any,
      name?: Partial<keyof TData_gestionPersona>
    ) =>
      set((state) => {
        const newData = name
          ? {
              ...(state.data ?? {}),
              [name]: { ...(state.data![name] as object), ...data },
            }
          : { ...state.data, ...data }
        return {
          data: newData,
          functions: useMethod_gestionPersona(newData),
        }
      }),
  }
})
