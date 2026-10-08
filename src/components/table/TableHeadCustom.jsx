import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Tooltip from "@mui/material/Tooltip"

import { StyledTableCell, WhiteBorderCheckbox } from "@/components/table/styles"

export default function TableHeadCustom({
  headCells = [],
  currentSort,
  onSort,
  onSelectAllClick,
  numSelected = 0,
  rowCount = 0,
  notShowCheckbox = false,
}) {
  return (
    <TableHead>
      <TableRow>
        {!notShowCheckbox && (
          <StyledTableCell
            padding="checkbox"
            sx={{
              width: 48,
              minWidth: 48,
              maxWidth: 48,
            }}
          >
            <WhiteBorderCheckbox
              color="white"
              checked={rowCount > 0 && numSelected === rowCount}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              onChange={onSelectAllClick}
            />
          </StyledTableCell>
        )}

        {headCells
          .filter((column) => !column.hidden)
          .map((column) => {
            const active = currentSort?.field === column.id

            const content = column.renderHeader ? column.renderHeader() : column.label

            const header = column.tooltip ? (
              <Tooltip title={column.tooltip}>
                <span>{content}</span>
              </Tooltip>
            ) : (
              content
            )

            return (
              <StyledTableCell
                key={column.id}
                align={column.align ?? "left"}
                padding={column.padding ?? "normal"}
                sortDirection={active ? currentSort.direction.toLowerCase() : false}
                sx={{
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth ?? column.width,

                  ...(column.sticky === "left" && {
                    position: "sticky",
                    left: 0,
                    zIndex: 2,
                  }),

                  ...(column.sticky === "right" && {
                    position: "sticky",
                    right: 0,
                    zIndex: 2,
                  }),

                  ...column.sx,
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={active}
                    direction={active ? currentSort.direction.toLowerCase() : "asc"}
                    onClick={() => onSort(column.id)}
                  >
                    {header}
                  </TableSortLabel>
                ) : (
                  header
                )}
              </StyledTableCell>
            )
          })}
      </TableRow>
    </TableHead>
  )
}
