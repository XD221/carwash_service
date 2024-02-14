import { clearUserInfo } from "src/utils/helper"

const Logout = () => {
  clearUserInfo()
  window.location.reload()
  return <></>
}

export default Logout
