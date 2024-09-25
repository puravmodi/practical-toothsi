import Grid from "@mui/material/Grid2";
import CartAmountSummary from "@/componets/CartAmountSummary";
import CartProductsTable from "@/componets/cart-products-table/CartProductsTable";

export const metadata = {
  title: "Cart Summary",
};

const CartPage = () => {
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

export default CartPage;
