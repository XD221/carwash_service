import { TNext } from "@type/default"
import { useNavigate } from "react-router-dom"
import {
  clearUserInfo,
  consultBackend,
  getUserInfo,
  setUserInfo,
} from "src/utils/helper"

const consultAuthorization = async () => {
  return new Promise((resolve, reject) => {
    consultBackend("cuenta/authentication", {
      params: { token: getUserInfo()?.token },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            if (data?.data) setUserInfo(data?.data)
            resolve(true)
          } else {
            clearUserInfo()
            resolve(false)
          }
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        clearUserInfo()
        reject(false)
      })
  })
}
const authorization = (params: unknown, next: TNext, pathname: string) => {
  const userInfo = getUserInfo()
  const navigate = useNavigate()
  if (pathname !== "/login") {
    consultAuthorization()
      .then((validation) => {
        if (!validation) {
          navigate("/login", { replace: true })
        }
      })
      .catch(() => {
        navigate("/login", { replace: true })
      })
    if (!userInfo) return next("/login")
  }
  if (userInfo && pathname === "/login") return next("/")
  return next()
}

export default authorization
