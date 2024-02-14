import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { useState } from "react"
import RutaGeneral from "@routes/RutaGeneral"
import Index from "./pages"
import PageNotFound from "@pages/PageNotFound"
import Middleware from "@component/Middleware"
import authorization from "./middleware/authorization"
import { Alert, AlertTitle, Snackbar } from "@mui/material"
import Slide, { SlideProps } from "@mui/material/Slide"
import { useApp } from "./context/AppContext"

dayjs.locale("es")
dayjs.extend(weekday)
dayjs.extend(localeData)

function App() {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") ?? "light"
    }
    return "light"
  })
  const app = useApp()
  const router = createBrowserRouter([
    {
      element: <Middleware middleware={[authorization]} />,
      errorElement: (
        <Middleware middleware={[authorization]} children={<PageNotFound />} />
      ),
      children: [
        {
          path: "/",
          element: <Index />,
        },
        ...RutaGeneral,
      ],
    },
  ])

  return (
    <CssVarsProvider>
      <Snackbar
        open={app.data.messageOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Slide}
        onClose={app.functions.messageClose_handle}
      >
        <Alert
          onClose={app.functions.messageClose_handle}
          severity={app.data.messageType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {app.data.messageTitle !== "" && (
            <AlertTitle>{app.data.messageTitle}</AlertTitle>
          )}
          {app.data.messageText}
        </Alert>
      </Snackbar>
      <RouterProvider router={router} />
    </CssVarsProvider>
  )
}

export default App
