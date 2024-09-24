"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/context/CartContextProvider";
import { getProductById } from "@/app/services/produst.service";
import { Product } from "@/types/product.type";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const calculateSubtotal = (price: number, quantity: number) => {
  return price * quantity;
};

const CartDetailsTable: FunctionComponent = () => {
  const { cart, removeFromCart, updateQuantity, setSubTotal } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getSelectedProducts = async () => {
      const selectedIds = cart?.map((item) => item.id);
      const products: Product[] = await getProductById(selectedIds);
      const updatedProducts = products.map((product) => {
        const cartItem = cart.find((cartItem) => cartItem.id === product.id);
        return {
          ...product,
          quantity: cartItem?.quantity,
        };
      });
      const total = updatedProducts
        ?.map((item) => calculateSubtotal(item.price, item.quantity))
        ?.reduce((acc, red) => acc + red, 0);
      setSubTotal(total);
      setSelectedProducts(updatedProducts);
      setisLoading(false);
    };
    getSelectedProducts();
  }, [cart, setSubTotal]);

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Product List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Product</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Price</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Quantity</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Subtotal</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={4}>
                  <IconButton
                    aria-label="close"
                    onClick={() => handleRemove(product.id)}
                  >
                    <CloseIcon />
                  </IconButton>

                  <Image
                    src={product.img}
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
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
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
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </Button>
                </ButtonGroup>
              </TableCell>
              <TableCell align="right">
                ${calculateSubtotal(product.price, product.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {selectedProducts.length == 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                <Typography>Cart is Empty</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartDetailsTable;
