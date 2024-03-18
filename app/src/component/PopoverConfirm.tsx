import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  Popover,
  PopoverProps,
  Typography,
} from "@mui/material"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import DangerousIcon from "@mui/icons-material/Dangerous"
import CustomButton from "./CustomButtom"

const PopoverConfirm = ({
  message,
  status,
  onConfirm,
  onClose,
  showIcon = true,
  loading = false,
  ...props
}: {
  message: string
  status?: "danger" | "info" | "warning" | undefined
  showIcon?: boolean
  loading?: boolean
  onConfirm?: ButtonProps["onClick"]
} & PopoverProps) => {
  const defaultIconName = WarningAmberIcon
  const IconName =
    status === "warning"
      ? WarningAmberIcon
      : status === "danger"
      ? DangerousIcon
      : status === "info"
      ? HelpOutlineIcon
      : defaultIconName
  return (
    <Popover
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      {...props}
    >
      <Card>
        <CardContent style={{ textAlign: "center" }}>
          {showIcon && (
            <IconName
              fontSize="medium"
              color={
                status === "warning"
                  ? "warning"
                  : status === "danger"
                  ? "error"
                  : status === "info"
                  ? "info"
                  : "warning"
              }
            />
          )}
          <Typography color="text.secondary" gutterBottom>
            {message}
          </Typography>
          <CustomButton loading={loading} onClick={onConfirm}>
            Si
          </CustomButton>
          <CustomButton onClick={(d) => onClose?.(d, "escapeKeyDown")}>
            No
          </CustomButton>
        </CardContent>
      </Card>
    </Popover>
  )
}

export default PopoverConfirm
