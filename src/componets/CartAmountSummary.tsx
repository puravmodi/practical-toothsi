"use client";
import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import Link from "next/link";
import { useCart } from "@/context/CartContextProvider";

const CartAmountSummary = () => {
  const { subTotal } = useCart();
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h5" component="div">
        Cart totals
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #EFEFEF"
        paddingBottom={2}
      >
        <Typography variant="subtitle2" component="div">
          Subtotal
        </Typography>
        <Typography variant="subtitle2" component="div">
          {subTotal}$
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" component="div">
          Total
        </Typography>
        <Typography variant="subtitle1" component="div">
          {subTotal}$
        </Typography>
      </Box>
      <Link href={"/thank-you"}>
        <Button variant="contained" sx={{ borderRadius: "50px" }} fullWidth>
          Proceed to checkout
        </Button>
      </Link>
    </Card>
  );
};

export default CartAmountSummary;
