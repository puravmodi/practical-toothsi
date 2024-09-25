import { Product } from "@/types/product.type";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { FunctionComponent } from "react";
import { calculateSubtotal } from "@/utils/cart-details.utils";
import { useCart } from "@/context/CartContextProvider";

type CartDetailsRowProps = {
  product: Product;
};

const CartProductsRow: FunctionComponent<CartDetailsRowProps> = ({
  product,
}) => {
  const { removeFromCart, updateQuantity } = useCart();
  return (
    <TableRow key={product.id}>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Box display="flex" alignItems="center" gap={4}>
          <IconButton
            aria-label="close"
            onClick={() => removeFromCart(product.id)}
          >
            <CloseIcon />
          </IconButton>

          <Image
            src={product.image}
            alt={product.name}
            height={50}
            width={50}
          />
          <Typography>{product.name}</Typography>
        </Box>
      </TableCell>
      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
      <TableCell align="right">
        <ButtonGroup
          aria-label="Basic button group"
          sx={{
            border: "1px solid #F7F5F7",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          <Button
            variant="text"
            sx={{
              borderRadius: "20px",
            }}
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
          >
            <RemoveIcon />
          </Button>
          <Button disabled variant="text">
            {product.quantity}
          </Button>
          <Button
            variant="text"
            sx={{
              borderRadius: "20px",
            }}
            disabled={product.stock === product.quantity}
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell align="right">
        ${calculateSubtotal(product.price, product.quantity).toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

export default CartProductsRow;
