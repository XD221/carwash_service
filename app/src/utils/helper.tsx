import { URLSearchParamsInit } from "@type/default"

export const encryptText = async (text: string) => {
  const { VITE_REACT_APP_HASH_SECRET } = import.meta.env
  const { default: hmacSHA512 } = await import("crypto-js/hmac-sha512")
  return hmacSHA512(text, VITE_REACT_APP_HASH_SECRET).toString()
}

export const getInfoName = () => {
  const { VITE_REACT_APP_INFO_NAME } = import.meta.env
  return btoa(VITE_REACT_APP_INFO_NAME)
}

export const getUserInfo = () => {
  const name = getInfoName()
  const content = localStorage.getItem(name)
  try {
    return content ? JSON.parse(atob(content)) : null
  } catch (error) {
    return null
  }
}

export const setUserInfo = (newData: {
  username: string
  nombre: string
  apellido: string
  role: string
  token: string
}) => {
  const name = getInfoName()
  localStorage.setItem(name, btoa(JSON.stringify(newData)))
}

export const clearUserInfo = () => {
  const name = getInfoName()
  localStorage.removeItem(name)
}

export const consultBackend = async (
  route: string,
  consultSettings?: {
    requestType?: "get" | "post" | "put" | "delete"
    settings?: Parameters<typeof fetch>[1]
    params?: URLSearchParamsInit
  }
) => {
  const { VITE_REACT_APP_BACKEND_URL } = import.meta.env
  const {
    requestType = "get",
    settings = {},
    params = {},
  } = consultSettings ?? {}
  const controller = new AbortController()
  const token = getUserInfo()?.token
  return fetch(
    `${VITE_REACT_APP_BACKEND_URL}${
      route && route.length > 0 && route.charAt(0) !== "/" ? `/${route}` : route
    }${
      requestType === "get" && Object.keys(params).length > 0
        ? `?${new URLSearchParams(params)}`
        : ""
    }`,
    {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
        allow_origins: "origins",
        allow_credentials: "true",
        allow_methods: "*",
        allow_headers: "*",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: requestType !== "get" ? JSON.stringify(params) : null,
      signal: controller.signal,
      // mode: "no-cors",
      ...settings,
    }
  )
}

export const restrictAllowOnlyNumber = (e: any, init = false) => {
  const t = e.target
  t.value = t.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")
  if (t.value.length > 1 && t.value.substring(0, 1) === "0") {
    if (!Number.isNaN(Number(t.value.substring(1, 2)))) {
      t.value = t.value.substring(1)
    }
  }
  if (t.value.length === 0 && init) {
    t.value = "0"
  }
}

export const restrictAllowOnlyNumberDecimal = (e: any, init = false) => {
  const t = e.target
  t.value = t.value.replace(/[^0-9\.]/g, "").replace(/(\..*)\./g, "$1")
  if (t.value.length > 1 && t.value.substring(0, 1) == "0") {
    if (!isNaN(t.value.substring(1, 2))) {
      t.value = t.value.substring(1)
    }
  }
  if (t.value.length == 0) {
    t.value = "0"
  }
  if (t.value.length > 0 && t.value.substring(0, 1) == ".") {
    t.value = "0"
  }
  if (t.value.search("\\.") > -1) {
    if (t.value.substring(t.value.search("\\.")).length > 3) {
      t.value = t.value.substring(0, t.value.length - 1)
    }
  }
}
