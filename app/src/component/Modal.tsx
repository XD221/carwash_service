import { styled, css } from "@mui/system"
import clsx from "clsx"
import { Modal as BaseModal, ModalProps, ModalSlots } from "@mui/base"
import { ReactNode, forwardRef } from "react"
import { useApp } from "src/context/AppContext"
import { Divider, IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"

const Modal = ({
  open,
  slots,
  title,
  width = 500,
  maskClosable = true,
  children,
  ...props
}: Omit<ModalProps, "open" | "slots" | "slots"> & {
  open: boolean
  slots?: ModalSlots
  title?: ReactNode
  width?: number
  maskClosable?: boolean
  children: NonNullable<ReturnType<typeof BaseModal>>
}) => {
  return (
    <CustomModal
      open={open}
      {...props}
      slots={{ backdrop: StyledBackdrop, ...slots }}
    >
      <ModalContent style={{ width: `${width}px` }}>
        {title && (
          <>
            <div style={{ marginLeft: "10px", marginTop: "10px" }}>
              <Typography
                style={{
                  float: "left",
                  width: "100%",
                }}
                variant="h6"
              >
                {title}
              </Typography>
              {maskClosable && (
                <IconButton
                  size="small"
                  style={{
                    position: "absolute",
                    right: "16px",
                    color: "inherit",
                  }}
                  onClick={() => props.onClose?.({}, "escapeKeyDown")}
                >
                  <Close />
                </IconButton>
              )}
            </div>
            <Divider />
          </>
        )}
        <div style={{ padding: "5px 24px 24px 24px" }}>{children}</div>
      </ModalContent>
    </CustomModal>
  )
}

export default Modal

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  )
})

const CustomModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`

const ModalContent = styled("div")(({ theme }) => {
  const {
    data: { grey, blue },
  } = useApp()
  return css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
})
