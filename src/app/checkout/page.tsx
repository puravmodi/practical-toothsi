import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const ThankyouPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid container spacing={2} direction={"column"}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography variant="h3">Thank You!</Typography>
          <Typography variant="body1">
            Your order has been placed successfully.
          </Typography>
          <Typography variant="body1">
            You will receive a confirmation email shortly.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Link href="/">
            <Button variant="contained" color="primary">
              Continue Shopping
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThankyouPage;
