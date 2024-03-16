import useData_agregarInversionista from "@logistics/admin/agregarInversionista/agregarInversionistaData"
import useMethod_agregarInversionista from "@logistics/admin/agregarInversionista/agregarInversionistaMethod"
import {
  TData as TData_agregarInversionista,
  TUseAgregarInversionista,
} from "@type/admin/TAgregarInversionista"
import { create } from "zustand"

export const useAgregarInversionista = create<TUseAgregarInversionista>(
  (set) => {
    const data = useData_agregarInversionista()
    const functions = useMethod_agregarInversionista(data)
    return {
      data,
      functions,
      setData: (
        data: Partial<TData_agregarInversionista> | any,
        name?: Partial<keyof TData_agregarInversionista>
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
            functions: useMethod_agregarInversionista(newData),
          }
        }),
    }
  }
)
