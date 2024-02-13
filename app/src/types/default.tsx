import { useData } from "@logistics/index/data"
import { useMethod } from "@logistics/index/methods"
import { JSXElementConstructor, ReactElement } from "react"

export type TProviderParams = {
  children?:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>[]
    | string
    | null
    | undefined
}

export type TProvider = ReactElement

export type TContextData = {
  data?: typeof useData
  method?: typeof useMethod
}

export type middlewareResult = (params: unknown, next: Function, pathname: string) => { success: boolean, data: unknown }