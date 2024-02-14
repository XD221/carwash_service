import useMethod from "@logistics/cuenta/login/loginMethod"
import { TUseLogin } from "@type/cuenta/TLogin"
import { create } from "zustand"

export const useLogin = create<TUseLogin>((set) => {
  const functions = useMethod()
  return {
    functions,
  }
})
