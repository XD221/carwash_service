import useData from "@logistics/admin/agregarInversionista/agregarInversionistaData"
import useMethod from "@logistics/admin/agregarInversionista/agregarInversionistaMethod"
import {
  TData,
  TUseAgregarInversionista,
} from "@type/admin/TAgregarInversionista"
import { create } from "zustand"

export const useAgregarInversionista = create<TUseAgregarInversionista>(
  (set) => {
    const data = useData()
    const functions = useMethod(data)
    return {
      data,
      functions,
      setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) =>
        set((state) => {
          const newData = name
            ? {
                ...(state.data ?? {}),
                [name]: { ...(state.data![name] as object), ...data },
              }
            : { ...state.data, ...data }
          return { data: newData, functions: useMethod(newData) }
        }),
    }
  }
)
