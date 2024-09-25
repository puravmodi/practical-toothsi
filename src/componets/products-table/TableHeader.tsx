import { Product } from "@/types/product.type";
import { TableCell, TableSortLabel } from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { HeadCell } from "./ProductsTable";

type TableHeaderProps = {
  headCell: HeadCell;
  order: "asc" | "desc";
  setOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  orderBy: Product["name"];
  setOrderBy: Dispatch<SetStateAction<Product["name"]>>;
};

const TableHeader: FunctionComponent<TableHeaderProps> = ({
  headCell,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}) => {
  // Handle sorting
  const handleRequestSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <TableCell
      key={headCell.id}
      align={`${headCell?.id === "buy" ? "right" : "left"}`}
    >
      {headCell.sortable ? (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : "asc"}
          onClick={() => handleRequestSort(headCell.id as keyof Product)}
        >
          {headCell.label}
        </TableSortLabel>
      ) : (
        headCell.label
      )}
    </TableCell>
  );
};

export default TableHeader;
