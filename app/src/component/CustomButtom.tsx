import { Button, ButtonProps, CircularProgress } from "@mui/material"
import { styled, css, Box } from "@mui/system"
import { useApp } from "src/context/AppContext"

const CustomButton = ({
  children,
  model = 1,
  loading = false,
  ...props
}: { model?: 1 | 2; loading?: boolean } & ButtonProps) => {
  const CustomButtonName =
    model === 1 ? Button : (CustomButtonModel2 as typeof Button)
  return (
    <CustomButtonName disabled={loading} {...props}>
      {children}
      {loading && (
        <CircularProgress
          size={props.size === "small" ? 18 : 24}
          sx={{
            position: "absolute",
            top: props.size === "small" ? "55%" : "50%",
            left: props.size === "small" ? "55%" : "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </CustomButtonName>
  )
}

const CustomButtonModel2 = styled("button")(({ theme }) => {
  const {
    data: { grey, blue },
  } = useApp()
  return css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
})

export default CustomButton
