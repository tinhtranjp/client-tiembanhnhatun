import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import Checkbox from "@mui/material/Checkbox"

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#333",
    color: "#fff",
    "& .MuiTableSortLabel-root": {
      color: "#fff !important",
      "&:hover": {
        color: "#fff !important",
      },
      "&.Mui-active": {
        color: "#fff !important",
      },
    },
    "& .MuiTableSortLabel-icon": {
      color: "#fff !important",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const WhiteBorderCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#fff",
  "&.Mui-checked": {
    color: "#fff",
  },
}))
export const styleModal = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "90%", // responsive cho mobile
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2, // bo góc mềm mại
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)", // shadow mềm hơn
  p: 4,
  outline: "none", // loại bỏ viền khi focus
  display: "flex",
  flexDirection: "column",
  gap: 2, // khoảng cách giữa các thành phần

  overflowY: "auto", // ✅ Cho phép scroll dọc
  scrollbarWidth: "thin", // (optional) làm mảnh scrollbar
  scrollbarColor: "#ccc transparent", // (optional) màu scrollbar
}
