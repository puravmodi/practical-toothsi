import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Product } from "@/types/product.type";
import { CartItem } from "@/context/CartContextProvider";

const ProductTableHeader = () => {
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(rows);

  const handleAddToCart = () => {
    const selectedProducts: CartItem[] = products
      ?.filter((product) => product?.isSelected)
      ?.map((product) => ({ id: product.id, quantity: product.quantity }));
    setCart(selectedProducts);
    rounter?.push("/cart-summary");
  };
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Clothes">Clothes</MenuItem>
            <MenuItem value="Shoes">Shoes</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={2}>
        <FormControl fullWidth>
          <InputLabel>Size</InputLabel>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value as string)}
            label="Size"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="S">Small</MenuItem>
            <MenuItem value="M">Medium</MenuItem>
            <MenuItem value="L">Large</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={3}>
        <Button variant="contained" onClick={() => {}}>
          Reset
        </Button>
      </Grid>
      <Grid size={"grow"}>
        <TextField
          fullWidth
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
  );
};

export default ProductTableHeader;
