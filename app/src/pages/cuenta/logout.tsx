import { useColorScheme } from "@mui/material"
import { clearUserInfo } from "src/utils/helper"

const Logout = () => {
  const { setMode } = useColorScheme()
  clearUserInfo()
  window.location.reload()
  setMode("light")
  return <></>
}

export default Logout
