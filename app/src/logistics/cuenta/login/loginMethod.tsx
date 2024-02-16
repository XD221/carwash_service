import { consultBackend, encryptText, setUserInfo } from "src/utils/helper"
import { useApp } from "src/context/AppContext"
import { TFunctions } from "@type/default"

const onFinish = async (
  event: React.FormEvent<HTMLFormElement>,
  messageApi: TFunctions["messageApi"]
) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  consultBackend("cuenta/login", {
    params: {
      username: data.get("username") as string,
      password: await encryptText(data.get("password") as string),
    },
  })
    .then((response) => {
      console.log(response)
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

const useMethod = () => {
  return {
    onFinish,
  }
}

export default useMethod
