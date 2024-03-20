import useData from "@logistics/inventario/gestionInventario/GestionInventarioData"
import useMethod from "@logistics/inventario/gestionInventario/GestionInventarioMethod"

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>
export type TUseGestionInventario = TUseState & TUseActions

type TUseState = {
  data: TData
  functions: TFunctions
}

type TUseActions = {
  setData: (data: Partial<TData> | any, name?: Partial<keyof TData>) => void
}

export type TSucursalFormat = {
  id: number
  nombre: string
  direccion: string
}

export type TProductoFormat = {
  id: number
  nombre: string
  precio: string
}
