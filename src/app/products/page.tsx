import AddToCart from "@/componets/AddToCart";
import ProductsTable from "@/componets/products-table/ProductsTable";
import TableFilters from "@/componets/products-table/TableFilters";
import { FilterProvider } from "@/context/FilterProvider";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const metadata = {
  title: "Products",
};

const ProductsPage = async () => {
  return (
    <FilterProvider>
      <Box p={3}>
        <Grid container spacing={3} alignItems="center">
          <TableFilters />
          <Grid>
            <AddToCart />
          </Grid>
        </Grid>
        <ProductsTable />
      </Box>
    </FilterProvider>
  );
};

export default ProductsPage;
