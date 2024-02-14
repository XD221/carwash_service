import { TData, TMessageType } from "@type/default"

export const useMethod = (data: TData) => {
  const messageOpen_onClick = () => {
    data.setMessageOpen(true)
  }

  const messageClose_handle = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // if (reason === "clickaway") {
    //   return
    // }
    data.setMessageOpen(false)
    if (data.messageText !== "") data.setMessageText("")
    if (data.messageTitle !== "") data.setMessageTitle("")
  }

  const messageApi = (
    message: string,
    { type, title = "" }: { type: TMessageType; title?: string }
  ) => {
    data.setMessageOpen(true)
    data.setMessageText(message)
    data.setMessageType(type)
    if (title !== "") data.setMessageTitle(title)
  }

  return {
    messageOpen_onClick,
    messageClose_handle,
    messageApi,
  }
}
