import React from "react";
import Grid from "@mui/material/Grid2";
import CartDetailsTable from "@/componets/CartDetailsTable";
import CartAmountSummary from "@/componets/CartAmountSummary";

const CartPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 9, xl: 9 }}>
        <CartDetailsTable />
      </Grid>
      <Grid size={{ xs: 12, md: 3, xl: 3 }}>
        <CartAmountSummary />
      </Grid>
    </Grid>
  );
};

export default CartPage;
