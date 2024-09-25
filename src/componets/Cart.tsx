import Grid from "@mui/material/Grid2";
import CartAmountSummary from "./CartAmountSummary";
import CartProductsTable from "./cart-products-table/CartProductsTable";

const Cart = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 9, xl: 9 }}>
        <CartProductsTable />
      </Grid>
      <Grid size={{ xs: 12, md: 3, xl: 3 }}>
        <CartAmountSummary />
      </Grid>
    </Grid>
  );
};

export default Cart;
