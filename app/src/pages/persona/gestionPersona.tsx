import CustomTable from "@component/CustomTable"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { useLayoutEffect } from "react"
import { useApp } from "src/context/AppContext"
import AgregarPersona from "./gestionPersona/agregarPersonaModal"
import { useGestionPersona } from "src/context/PersonaContext"
import VistaPrincipal from "./gestionPersona/vistaPrincipal"

const GestionPersona = () => {
  const app = useApp()
  const state = useGestionPersona()
  useLayoutEffect(() => {
    if (state.data.personaRows.length === 0) {
      state.functions.initialState(state.setData, app.functions.messageApi)
    }
  }, [])
  return (
    <>
      <VistaPrincipal state={state} app={app} />
      <AgregarPersona state={state} app={app} />
    </>
  )
}

export default GestionPersona
