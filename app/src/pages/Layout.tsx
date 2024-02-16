import { TComponentChildrenParam } from "@type/default"
import HeaderBar from "@component/HeadBar"
import Container from "@mui/material/Container"
import { useLocation } from "react-router-dom"
import { CssBaseline } from "@mui/material"

const Layout = ({
  children,
}: {
  children?: TComponentChildrenParam | unknown
}) => {
  const { pathname } = useLocation()
  if (pathname !== "/login") {
    return (
      <Container id="container">
        <CssBaseline />
        <HeaderBar />
        <div id="mainBody">{children as TComponentChildrenParam}</div>
        {/* <Footer /> */}
      </Container>
    )
  }
  return children
}

export default Layout
