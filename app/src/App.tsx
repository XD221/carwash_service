import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import RutaGeneral from "@routes/RutaGeneral";
import Index from "./pages";

dayjs.locale("es");
dayjs.extend(weekday);
dayjs.extend(localeData);

function App() {
	const [mode, setMode] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("mode") ?? "light";
		}
		return "light";
	});
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Index />,
		},
		// ...RutaGeneral,
	]);

	return (
		<CssVarsProvider>
			<RouterProvider router={router} />
		</CssVarsProvider>
	);
}

export default App;
