import { FunctionComponent } from "react";
import CategoryFilter from "./table-filters/CategoryFilter";
import SizeFilter from "./table-filters/SizeFilter";
import Grid from "@mui/material/Grid2";
import ResetFilterButton from "./table-filters/ResetFilterButton";
import ProductSearchFilter from "./table-filters/ProductSearchFilter";

const TableFilters: FunctionComponent = () => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4, lg: 2 }}>
        <CategoryFilter />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 2 }}>
        <SizeFilter />
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <ResetFilterButton />
      </Grid>
      <Grid size={"grow"}>
        <ProductSearchFilter />
      </Grid>
    </>
  );
};

export default TableFilters;
