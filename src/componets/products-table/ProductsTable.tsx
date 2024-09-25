"use client";
import { Product } from "@/types/product.type";
import { getComparator, stableSort } from "@/utils/product-table.utils";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import ProductRow from "./ProductRow";
import TableHeader from "./TableHeader";
import { useFilters } from "@/context/FilterProvider";

export interface HeadCell {
  id: keyof Product | "buy";
  label: string;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  { id: "image", label: "Image", sortable: false },
  { id: "name", label: "Name", sortable: true },
  { id: "color", label: "Color", sortable: true },
  { id: "stock", label: "Stock", sortable: false },
  { id: "price", label: "Price", sortable: true },
  { id: "buy", label: "Buy", sortable: false },
];

const ProductsTable: FunctionComponent = () => {
  const [orderBy, setOrderBy] = useState<Product["name"]>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { products } = useFilters();

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 3, backgroundColor: "#FAFAFA", border: "none" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
          <TableRow>
            {headCells?.map((headCell) => (
              <TableHeader
                key={headCell.id}
                headCell={headCell}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                order={order}
                setOrder={setOrder}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(products, getComparator(order, orderBy)).map((row) => (
            <ProductRow key={row?.id} product={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
