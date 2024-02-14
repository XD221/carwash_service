import useMethod from "@logistics/cuenta/login/loginMethod"

export type TFunctions = ReturnType<typeof useMethod>
export type TUseLogin = TUseState

type TUseState = {
  functions: TFunctions
}
