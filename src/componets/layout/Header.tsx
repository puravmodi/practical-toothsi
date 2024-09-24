import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={"/products"}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toothsi Practical
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
