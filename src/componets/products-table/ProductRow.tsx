import { Product } from "@/types/product.type";
import { Box, Checkbox, TableCell, TableRow, TextField } from "@mui/material";
import Image from "next/image";
import { FunctionComponent } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SadIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useFilters } from "@/context/FilterProvider";

type ProductRowProps = {
  product: Product;
};

const ProductRow: FunctionComponent<ProductRowProps> = ({ product }) => {
  const { setProducts } = useFilters();
  const inStock = product.stock > 0;

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

  return (
    <TableRow key={product.id}>
      <TableCell>
        <Image src={product.image} alt={product.name} height={50} width={50} />
      </TableCell>
      <TableCell
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "200px",
        }}
        title={product.name}
      >
        {product.name}
      </TableCell>
      <TableCell>{product.color}</TableCell>
      <TableCell>
        <Box
          color={inStock ? "green" : "red"}
          display="flex"
          alignItems="center"
          gap={2}
        >
          {inStock ? <EmojiEmotionsIcon /> : <SadIcon />}
          <p>{inStock ? "In Stock" : "Out of Stock"}</p>
        </Box>
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell align="right">
        <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            sx={{ width: "70px" }}
            value={inStock ? product.quantity : 0}
            onChange={(event) => handleQuantityChange(event, product.id)}
            disabled={!inStock}
          />
          <ShoppingCartIcon />
          <Checkbox
            checked={product.isSelected}
            disabled={!inStock}
            onChange={(event) => handleCheck(event, product.id)}
            color="primary"
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
