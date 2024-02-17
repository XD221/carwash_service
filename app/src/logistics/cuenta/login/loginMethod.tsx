import { consultBackend, encryptText, setUserInfo } from "src/utils/helper"
import { useApp } from "src/context/AppContext"
import { TFunctions } from "@type/default"
import { TData, TUseLogin } from "@type/cuenta/TLogin"

const onFinish = async (
  event: React.FormEvent<HTMLFormElement>,
  setData: TUseLogin["setData"],
  messageApi: TFunctions["messageApi"]
) => {
  let existError = false
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const errors = {
    username: false,
    password: false,
  }
  const username = data.get("username") as string
  const password = data.get("password") as string
  if (username?.length < 3) errors.username = true
  if (password?.length < 3) errors.password = true
  for (const error in errors)
    if (errors[error as keyof typeof errors]) {
      existError = true
      break
    }
  setData(errors, "errors")
  if (!existError)
    consultBackend("cuenta/login", {
      params: {
        username: username,
        password: await encryptText(password),
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (data?.success) {
            setUserInfo(data?.data)
            window.location.reload()
          } else {
            messageApi(data?.message, { type: "error" })
          }
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        messageApi("El servicio no responde, intente más tarde.", {
          type: "error",
        })
      })
}

const useMethod = (data: TData) => {
  return {
    onFinish,
  }
}

export default useMethod
