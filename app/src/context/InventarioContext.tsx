import { create } from "zustand"
import useData_Productos from "@logistics/inventario/productos/ProductosData"
import useMethod_Productos from "@logistics/inventario/productos/ProductosMethod"
import useData_GestionInventario from "@logistics/inventario/gestionInventario/GestionInventarioData"
import useMethod_GestionInventario from "@logistics/inventario/gestionInventario/GestionInventarioMethod"
import {
  TUseProductos,
  TData as TData_Productos,
} from "@type/inventario/TProductos"
import {
  TUseGestionInventario,
  TData as TData_TUseGestionInventario,
} from "@type/inventario/TGestionInventario"

export const useProductos = create<TUseProductos>((set) => {
  const data = useData_Productos()
  const functions = useMethod_Productos(data)
  return {
    data,
    functions,
    setData: (
      data: Partial<TData_Productos> | any,
      name?: Partial<keyof TData_Productos>
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
          functions: useMethod_Productos(newData),
        }
      }),
  }
})

export const useGestionInventario = create<TUseGestionInventario>((set) => {
  const data = useData_GestionInventario()
  const functions = useMethod_GestionInventario(data)
  return {
    data,
    functions,
    setData: (
      data: Partial<TData_TUseGestionInventario> | any,
      name?: Partial<keyof TData_TUseGestionInventario>
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
          functions: useMethod_GestionInventario(newData),
        }
      }),
  }
})
