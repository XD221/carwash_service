import useData_tarifaTipoVehiculo from "@logistics/inversionista/tarifaTipoVehiculo/tarifaTipoVehiculoData"
import useMethod_tarifaTipoVehiculo from "@logistics/inversionista/tarifaTipoVehiculo/tarifaTipoVehiculoMethod"
import useData_Servicios from "@logistics/inversionista/Servicios/ServiciosData"
import useMethod_Servicios from "@logistics/inversionista/Servicios/ServiciosMethod"
import {
  TData as TData_Servicios,
  TUseServicios,
} from "@type/inversionista/TServicios"
import { TData as TData_tarifaTipoVehiculo } from "@type/inversionista/TTarifaTipoVehiculo"
import { TUseTarifaTipoVehiculo } from "@type/inversionista/TTarifaTipoVehiculo"
import { create } from "zustand"

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

export const useServicios = create<TUseServicios>((set) => {
  const data = useData_Servicios()
  const functions = useMethod_Servicios(data)
  return {
    data,
    functions,
    setData: (
      data: Partial<TData_Servicios> | any,
      name?: Partial<keyof TData_Servicios>
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
          functions: useMethod_Servicios(newData),
        }
      }),
  }
})
