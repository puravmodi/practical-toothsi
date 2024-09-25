"use client";
import { FunctionComponent, useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { useCart } from "@/context/CartContextProvider";
import { getProductById } from "@/services/produst.service";
import { Product } from "@/types/product.type";
import CircularProgress from "@mui/material/CircularProgress";
import { calculateSubtotal } from "@/utils/cart-details.utils";
import CartProductsHeader from "./CartProductsHeader";
import CartProductsRow from "./CartProductsRow";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Link from "next/link";

const CartProductsTable: FunctionComponent = () => {
  const { cart, setSubTotal } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getSelectedProducts = async () => {
      const selectedIds = cart?.map((item) => item.id);
      const products: Product[] = await getProductById(selectedIds);
      const updatedProducts: Product[] = products.map((product) => {
        const cartItem = cart?.find((cartItem) => cartItem.id === product.id);
        return {
          ...product,
          quantity: cartItem?.quantity || 0,
        };
      });
      const total = updatedProducts
        ?.map((item) => calculateSubtotal(item.price, item.quantity || 0))
        ?.reduce((acc, red) => acc + red, 0);
      setSubTotal(total);
      setSelectedProducts(updatedProducts);
      setisLoading(false);
    };
    getSelectedProducts();
  }, [cart, setSubTotal]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Product List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <CartProductsHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProducts?.map((product) => (
            <CartProductsRow key={product.id} product={product} />
          ))}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                <CircularProgress size={20} />
              </TableCell>
            </TableRow>
          )}
          {selectedProducts.length == 0 && !isLoading && (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ textAlign: "center", paddingY: "30px" }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <RemoveShoppingCartIcon fontSize="large" />
                  <Typography>Your cart is empty!</Typography>
                  <Link href="/products">
                    <Button variant="contained">Shop now</Button>
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartProductsTable;
