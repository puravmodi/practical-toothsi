"use client";
import React, { FunctionComponent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Checkbox,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@/types/product.type";
import { CartItem, useCart } from "@/context/CartContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define the shape of the table row data

// Table head column definition
interface HeadCell {
  id: keyof Product | "buy";
  label: string;
  sortable: boolean;
}

// Comparator logic for sorting
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedArray = array.map((el, index) => [el, index] as [T, number]);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedArray.map((el) => el[0]);
}

// Define table head columns
const headCells: HeadCell[] = [
  { id: "img", label: "Image", sortable: false },
  { id: "name", label: "Name", sortable: true },
  { id: "color", label: "Color", sortable: true },
  { id: "stock", label: "Stock", sortable: true },
  { id: "price", label: "Price", sortable: true },
  { id: "buy", label: "Buy", sortable: false },
];

type SortableTableProps = {
  rows: Product[];
};

const SortableTable: FunctionComponent<SortableTableProps> = ({ rows }) => {
  const { setCart } = useCart();
  const rounter = useRouter();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<Product["name"]>("name");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(rows);

  // Handle sorting
  const handleRequestSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Filter and search logic
  const filteredRows = products?.filter((row) => {
    const categoryMatch = category ? row.category === category : true;
    const sizeMatch = size ? row.size === size : true;
    const searchMatch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return categoryMatch && sizeMatch && searchMatch;
  });

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    setProducts((prev) => {
      const item = prev.find((product) => product.id === id);
      if (item) {
        item.quantity = +event.target.value;
      }

      return [...prev];
    });
  };

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setProducts((prev) => {
      const item = prev.find((product) => product.id === id);
      if (item) {
        item.isSelected = event.target.checked;
      }
      return [...prev];
    });
  };

  const handleAddToCart = () => {
    const selectedProducts: CartItem[] = products
      ?.filter((product) => product?.isSelected)
      ?.map((product) => ({ id: product.id, quantity: product.quantity }));
    setCart(selectedProducts);
    rounter?.push("/cart-summary");
  };

  const handleReset = () => {
    setCategory("");
    setSize("");
    setSearchQuery("");
    setProducts(rows);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, md: 4, lg: 2 }}>
          <FormControl fullWidth>
            <InputLabel size="small">Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
              label="Category"
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Clothes">Clothes</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 2 }}>
          <FormControl fullWidth>
            <InputLabel size="small">Size</InputLabel>
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value as string)}
              label="Size"
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="S">Small</MenuItem>
              <MenuItem value="M">Medium</MenuItem>
              <MenuItem value="L">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Button
            variant="text"
            onClick={handleReset}
            startIcon={<ReplayIcon />}
            sx={{ float: { xs: "right", sm: "left" } }}
          >
            Reset
          </Button>
        </Grid>
        <Grid size={"grow"}>
          <TextField
            fullWidth
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid>
          {/* <Link href={"/cart-summary"}> */}
          <Button variant="contained" onClick={handleAddToCart}>
            Add to cart
          </Button>
          {/* </Link> */}
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 3, backgroundColor: "#FAFAFA", border: "none" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={`${headCell?.id === "buy" ? "right" : "left"}`}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() =>
                        handleRequestSort(headCell.id as keyof Product)
                      }
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredRows, getComparator(order, orderBy)).map(
              (row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {/* <img src={row.img} alt={row.name} width={50} height={50} /> */}
                    <Image
                      src={row.img}
                      alt={row.name}
                      height={50}
                      width={50}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.color}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>${row.price}</TableCell>
                  <TableCell align="right">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                      gap={2}
                    >
                      <TextField
                        variant="outlined"
                        size="small"
                        sx={{ width: "70px" }}
                        value={row?.quantity}
                        onChange={(event) =>
                          handleQuantityChange(event, row?.id)
                        }
                      />
                      <ShoppingCartIcon />
                      <Checkbox
                        checked={row?.isSelected}
                        onChange={(event) => handleCheck(event, row?.id)}
                        color="primary"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SortableTable;
