import { createContext, useContext } from "react"
import { useData } from "src/logistics/index/data"
import { useMethod } from "src/logistics/index/methods"
import { TContextData, TProvider, TProviderParams } from "@type/default"

const AppContext = createContext({} as TContextData)

export const AppProvider = ({ children }: TProviderParams): TProvider => {
  const data = useData()
  const functions = useMethod(data)
  const content = {
    data,
    functions,
  }
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext<TContextData>(AppContext)
  if (!context) throw new Error("No existe contexto")
  return context
}
