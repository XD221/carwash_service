import { useData } from "@logistics/index/data"
import { useMethod } from "@logistics/index/methods"
import { JSXElementConstructor, ReactElement } from "react"

export type TMenu = {
  id: string
  anchorEl: null | HTMLElement
  open: boolean
  handleClose: (route?: string) => void
}

export type TMessageType = "success" | "info" | "warning" | "error"

export type TUserRole = "ADMIN" | "OPERADOR" | "INVERSIONISTA" | undefined

export type TMode = "light" | "dark"

export type TComponentChildrenParam =
  | ReactElement<unknown, string | JSXElementConstructor<unknown>>[]
  | string
  | null
  | undefined

export type TProviderParams = {
  children?: TComponentChildrenParam
}

export type TProvider = ReactElement

export type TData = ReturnType<typeof useData>
export type TFunctions = ReturnType<typeof useMethod>

export type TContextData = {
  data: TData
  functions: TFunctions
}

export type middlewareResult = (
  params: unknown,
  next: TNext,
  pathname: string
) => { success: boolean; data: unknown }

export type TNext = (route?: string) => { success: boolean; data: unknown }

export type URLSearchParamsInit =
  | string
  | URLSearchParams
  | Record<string, string>
  | [string, string][]
