import useData_agregarInversionista from "@logistics/admin/agregarInversionista/agregarInversionistaData"
import useData_tarifaTipoVehiculo from "@logistics/admin/tarifaTipoVehiculo/tarifaTipoVehiculoData"
import useMethod_agregarInversionista from "@logistics/admin/agregarInversionista/agregarInversionistaMethod"
import useMethod_tarifaTipoVehiculo from "@logistics/admin/tarifaTipoVehiculo/tarifaTipoVehiculoMethod"
import {
  TData as TData_agregarInversionista,
  TUseAgregarInversionista,
} from "@type/admin/TAgregarInversionista"
import { TData as TData_tarifaTipoVehiculo } from "@type/admin/TTarifaTipoVehiculo"
import { TUseTarifaTipoVehiculo } from "@type/admin/TTarifaTipoVehiculo"
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

export const useTarifaTipoVehiculo = create<TUseTarifaTipoVehiculo>((set) => {
  const data = useData_tarifaTipoVehiculo()
  const functions = useMethod_tarifaTipoVehiculo(data)
  return {
    data,
    functions,
    setData: (
      data: Partial<TData_tarifaTipoVehiculo> | any,
      name?: Partial<keyof TData_tarifaTipoVehiculo>
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
          functions: useMethod_tarifaTipoVehiculo(newData),
        }
      }),
  }
})
