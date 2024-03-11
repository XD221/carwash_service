import { TMessageType, TUserRole } from "@type/default"
import { useState } from "react"

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
}

export const useData = () => {
  const [messageOpen, setMessageOpen] = useState<boolean>(false)
  const [messageTitle, setMessageTitle] = useState<string>("")
  const [messageText, setMessageText] = useState<string>("")
  const [messageType, setMessageType] = useState<TMessageType>("success")
  const [role, setRole] = useState<TUserRole>(undefined)

  return {
    messageOpen,
    setMessageOpen,
    role,
    setRole,
    messageTitle,
    setMessageTitle,
    messageText,
    setMessageText,
    messageType,
    setMessageType,
    blue,
    grey,
  }
}
