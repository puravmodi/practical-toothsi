import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export const metadata = {
  title: "Checkout",
};

const Checkout = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Typography variant="h3">Thank You!</Typography>
      <Typography variant="body1">
        Your order has been placed successfully.
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary">
          Continue Shopping
        </Button>
      </Link>
    </Grid>
  );
};

export default Checkout;
