import { TMessageType, TUserRole } from "@type/default"
import { useState } from "react"

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
  }
}
